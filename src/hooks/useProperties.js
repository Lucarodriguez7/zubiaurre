// ─────────────────────────────────────────────────────────────────
//  useProperties.js
//  Hook central de datos. Cuando tokko.enabled = true en config.js
//  llama al proxy Node. Cuando es false usa el mockData local.
//  Las páginas nunca saben de dónde vienen los datos.
// ─────────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback, useRef } from "react";
import config from "../config";
import { normalizeList, normalizeProperty } from "../utils/tokkoNormalizer";
import {
  mockProperties,
  getPropertyBySlug as mockGetBySlug,
  filterProperties as mockFilter,
  getFeatured as mockGetFeatured,
} from "../utils/mockData";

const { tokko } = config;

// ── Caché en memoria (evita re-fetches al navegar) ────────────────
const cache = new Map();
function cacheKey(path, params) {
  return path + JSON.stringify(params || {});
}

// ── Fetch base con caché ──────────────────────────────────────────
async function tokkoFetch(endpoint, params = {}) {
  const key  = cacheKey(endpoint, params);
  if (cache.has(key)) return cache.get(key);

  const url  = new URL(`${tokko.apiBaseUrl}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  });

  const res  = await fetch(url.toString());
  if (!res.ok) throw new Error(`Tokko API error ${res.status}: ${url.pathname}`);
  const data = await res.json();
  cache.set(key, data);
  // Caché expira a los 5 minutos
  setTimeout(() => cache.delete(key), 5 * 60 * 1000);
  return data;
}

// ═══════════════════════════════════════════════════════════════════
//  useProperties — listado con filtros
// ═══════════════════════════════════════════════════════════════════
export function useProperties(filters = {}) {
  const [properties, setProperties] = useState([]);
  const [total,      setTotal]      = useState(0);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const abortRef = useRef(null);

  const { operation, type, neighborhood, search, sort, limit = 12, offset = 0 } = filters;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Cancelar fetch anterior si sigue en vuelo
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    try {
      if (!tokko.enabled) {
        // ── MODO MOCK ──────────────────────────────────────────────
        await new Promise((r) => setTimeout(r, 350)); // simula latencia
        let results = mockFilter({ operation, type, neighborhood });

        if (search?.trim()) {
          const q = search.toLowerCase();
          results = results.filter(
            (p) =>
              p.title.toLowerCase().includes(q)       ||
              p.address.toLowerCase().includes(q)     ||
              p.neighborhood?.toLowerCase().includes(q)
          );
        }
        if (sort === "price-asc")  results.sort((a, b) => a.price - b.price);
        if (sort === "price-desc") results.sort((a, b) => b.price - a.price);
        if (sort === "new")        results.sort((a, b) => b.id - a.id);
        if (sort === "default")    results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

        setTotal(results.length);
        setProperties(results.slice(offset, offset + limit));
      } else {
        // ── MODO TOKKO ─────────────────────────────────────────────
        const params = {
          limit,
          offset,
          ...(operation && { operation_type: tokkoOperationType(operation) }),
          ...(type       && { property_type:  tokkoPropertyType(type)      }),
          ...(search     && { search                                        }),
          ...(sort === "price-asc"  && { order_by: "price_from_usd" }),
          ...(sort === "price-desc" && { order_by: "-price_from_usd" }),
          ...(sort === "new"        && { order_by: "-created_at" }),
        };

        const data = await tokkoFetch("/properties", params);

        setTotal(data.meta?.total_count || 0);
        setProperties(normalizeList(data.objects || []));
      }
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error("[useProperties]", err);
      setError(err.message);
      // Fallback a mock si falla Tokko
      setProperties(mockFilter({ operation, type }).slice(0, limit));
    } finally {
      setLoading(false);
    }
  }, [operation, type, neighborhood, search, sort, limit, offset]);

  useEffect(() => { load(); }, [load]);

  return { properties, total, loading, error, refetch: load };
}

// ═══════════════════════════════════════════════════════════════════
//  useFeaturedProperties — destacadas para el Home
//
//  Lógica:
//  1. Pide propiedades con is_starred_on_web = true (destacadas en Tokko)
//  2. Si el cliente no marcó ninguna, cae a las más recientes
//     para que el Home nunca quede vacío.
// ═══════════════════════════════════════════════════════════════════
export function useFeaturedProperties(limit = 3) {
  const [properties, setProperties] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [source,     setSource]     = useState("featured");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        if (!tokko.enabled) {
          await new Promise((r) => setTimeout(r, 300));
          const featured = mockGetFeatured();
          if (featured.length > 0) {
            setProperties(featured.slice(0, limit));
            setSource("featured");
          } else {
            setProperties(mockProperties.slice(0, limit));
            setSource("recent");
          }
        } else {
          // Intento 1: pedir las destacadas
          const featuredData = await tokkoFetch("/properties", {
            limit,
            is_starred_on_web: true,
            order_by: "-created_at",
          });
          const featuredList = normalizeList(featuredData.objects || []);

          if (featuredList.length > 0) {
            setProperties(featuredList.slice(0, limit));
            setSource("featured");
          } else {
            // Sin destacadas → fallback a más recientes
            console.info("[useFeaturedProperties] Sin destacadas, mostrando recientes.");
            const recentData = await tokkoFetch("/properties", {
              limit,
              order_by: "-created_at",
            });
            setProperties(normalizeList(recentData.objects || []).slice(0, limit));
            setSource("recent");
          }
        }
      } catch (err) {
        console.error("[useFeaturedProperties]", err);
        setError(err.message);
        setProperties(mockGetFeatured().slice(0, limit));
        setSource("featured");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [limit]);

  return { properties, loading, error, source };
}

// ═══════════════════════════════════════════════════════════════════
//  useProperty — una sola propiedad por slug o id
// ═══════════════════════════════════════════════════════════════════
export function useProperty(slugOrId) {
  const [property, setProperty] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    if (!slugOrId) return;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        if (!tokko.enabled) {
          await new Promise((r) => setTimeout(r, 250));
          // Buscar por slug primero, luego por id numérico
          const found = mockGetBySlug(slugOrId)
            || mockProperties.find((p) => p.id === parseInt(slugOrId));
          setProperty(found || null);
        } else {
          // En Tokko, el "slug" que generamos es "titulo-id"
          // Extraemos el id del final del slug
          const id = extractIdFromSlug(slugOrId);
          if (!id) throw new Error("ID inválido");
          const data = await tokkoFetch(`/properties/${id}`);
          setProperty(normalizeProperty(data));
        }
      } catch (err) {
        console.error("[useProperty]", err);
        setError(err.message);
        // Fallback mock
        const found = mockGetBySlug(slugOrId)
          || mockProperties.find((p) => p.id === parseInt(slugOrId));
        setProperty(found || null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slugOrId]);

  return { property, loading, error };
}

// ── Mapas Tokko ───────────────────────────────────────────────────
// Tokko usa IDs numéricos para operación y tipo
function tokkoOperationType(op) {
  const map = { venta: 1, alquiler: 2, "alquiler temporario": 3 };
  return map[op] || "";
}

function tokkoPropertyType(type) {
  const map = {
    departamento: "1,13",  // departamento + duplex
    casa:         "2,14",  // casa + chalet
    oficina:      "5",
    local:        "4",
    terreno:      "7",
    cochera:      "8",
    galpon:       "6",
    campo:        "9",
    ph:           "3",
  };
  return map[type] || "";
}

function extractIdFromSlug(slug) {
  // El slug tiene formato "titulo-de-propiedad-12345"
  // Extraemos el último segmento numérico
  const parts  = String(slug).split("-");
  const lastNum = parts.reverse().find((p) => /^\d+$/.test(p));
  return lastNum || (isNaN(parseInt(slug)) ? null : slug);
}
