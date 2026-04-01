// ═══════════════════════════════════════════════════════════════════
//  server.js  —  Proxy Node.js para Tokko Broker API
//
//  ¿Por qué existe este proxy?
//  La API de Tokko no permite llamadas directas desde el browser
//  (CORS). Este servidor actúa de intermediario: el frontend llama
//  a /api/... y este server llama a Tokko con tu API key.
//
//  SETUP:
//    1. Creá un archivo .env con: TOKKO_API_KEY=tu_key_aqui
//    2. npm install (ya incluye express, cors, node-fetch)
//    3. node server.js  →  http://localhost:3001
//
//  DEPLOY:
//    Railway: conectar repo → Start command: node server.js
//    Render:  conectar repo → Start command: node server.js
//    Luego cambiar en config.js: tokko.apiBaseUrl = "https://tu-proxy.railway.app/api"
// ═══════════════════════════════════════════════════════════════════

require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const fetch    = require("node-fetch");

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Validar que tenemos la API key ────────────────────────────────
const API_KEY = process.env.TOKKO_API_KEY;
if (!API_KEY) {
  console.error("❌  TOKKO_API_KEY no está definida en .env");
  console.error("    Creá un archivo .env con: TOKKO_API_KEY=tu_key_aqui");
  process.exit(1);
}

const TOKKO_BASE = "https://www.tokkobroker.com/api/v1";

// ── Middleware ─────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Caché simple en memoria (5 minutos) ───────────────────────────
const cache   = new Map();
const CACHE_TTL = 5 * 60 * 1000;

function getCache(key)         { const e = cache.get(key); return e && Date.now() < e.exp ? e.data : null; }
function setCache(key, data)   { cache.set(key, { data, exp: Date.now() + CACHE_TTL }); }

// ── Helper: llamar a Tokko ─────────────────────────────────────────
async function tokko(path, params = {}) {
  const url = new URL(`${TOKKO_BASE}${path}`);
  url.searchParams.set("key",    API_KEY);
  url.searchParams.set("format", "json");
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
  });

  const cacheKey = url.toString();
  const cached   = getCache(cacheKey);
  if (cached) return cached;

  const res = await fetch(url.toString(), { timeout: 10000 });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Tokko ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  setCache(cacheKey, data);
  return data;
}

// ── Normalizador (igual que el del frontend) ──────────────────────
const OP_MAP = { 1: "venta", 2: "alquiler", 3: "alquiler temporario" };
const TYPE_MAP = {
  1: "departamento", 2: "casa", 3: "ph", 4: "local", 5: "oficina",
  6: "galpon", 7: "terreno", 8: "cochera", 9: "campo", 10: "quinta",
  13: "departamento", 14: "casa",
};

function slugify(str) {
  return (str || "")
    .toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60);
}

function normalize(raw) {
  if (!raw) return null;
  const firstOp    = raw.operations?.[0] || {};
  const firstPrice = firstOp.prices?.[0]  || {};
  const photos     = (raw.photos || [])
    .sort((a, b) => (a.order||0)-(b.order||0))
    .map((p) => p.image || p.thumb).filter(Boolean);
  if (!photos.length) photos.push("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80");

  const slug = slugify(raw.publication_title || raw.address || "") + "-" + raw.id;

  let status = "disponible";
  if (raw.status === 2 || raw.reserved) status = "reservado";
  if (raw.status === 3 || raw.sold)     status = "vendido";

  const agent = raw.agents?.[0] || null;
  const amenities = (raw.tags || []).map((t) => t.name).filter(Boolean);

  return {
    id:              raw.id,
    slug,
    title:           raw.publication_title || raw.address || "Propiedad",
    subtitle:        [raw.type?.name, raw.room_amount && `${raw.room_amount} amb.`, raw.roofed_surface && `${raw.roofed_surface} m²`].filter(Boolean).join(" · "),
    description:     raw.description || "",
    address:         raw.address || "",
    neighborhood:    raw.neighborhood?.name || raw.location?.name || "",
    city:            raw.location?.parent?.name || "",
    lat:             parseFloat(raw.geo_lat)  || null,
    lng:             parseFloat(raw.geo_long) || null,
    operation:       OP_MAP[firstOp.operation_type] || "venta",
    price:           parseFloat(firstPrice.price) || 0,
    currency:        firstPrice.currency === "USD" ? "USD" : "ARS",
    expenses:        raw.expenses ? parseFloat(raw.expenses) : null,
    expensesCurrency: raw.expenses_currency || "ARS",
    type:            TYPE_MAP[raw.type?.id] || raw.type?.name?.toLowerCase() || "propiedad",
    status,
    featured:        Boolean(raw.is_starred_on_web),
    isNew:           raw.created_at ? (Date.now() - new Date(raw.created_at)) / 86400000 <= 30 : false,
    rooms:           parseInt(raw.room_amount)        || 0,
    bedrooms:        parseInt(raw.bedroom_amount)     || 0,
    bathrooms:       parseInt(raw.bathroom_amount)    || 0,
    garage:          parseInt(raw.parking_lot_amount) || 0,
    surfaceCovered:  parseFloat(raw.roofed_surface)   || 0,
    surfaceTotal:    parseFloat(raw.total_surface)    || 0,
    surfaceTerrace:  parseFloat(raw.unroofed_surface) || 0,
    floor:           raw.floor != null ? parseInt(raw.floor) : null,
    totalFloors:     raw.floors ? parseInt(raw.floors) : null,
    orientation:     raw.orientation || null,
    antiquity:       raw.age != null ? parseInt(raw.age) : null,
    photos,
    videoUrl:        raw.videos?.[0]?.player_url || null,
    virtualTourUrl:  raw.virtual_tour_url || null,
    amenities,
    highlights:      amenities.slice(0, 4),
    agent: agent ? {
      name:  agent.name  || "Asesor",
      phone: agent.phone || "",
      photo: agent.photo || "",
    } : null,
  };
}

// ════════════════════════════════════════════════════════════════════
//  ENDPOINTS
// ════════════════════════════════════════════════════════════════════

// ── GET /api/properties ────────────────────────────────────────────
// Parámetros:
//   limit, offset        → paginación
//   operation_type       → 1=venta, 2=alquiler
//   property_type        → "1,13" = departamentos, "2,14" = casas, etc
//   search               → texto libre
//   order_by             → price_from_usd, -price_from_usd, -created_at
//   is_starred_on_web    → true = solo destacadas
app.get("/api/properties", async (req, res) => {
  try {
    const {
      limit = 12, offset = 0,
      operation_type, property_type,
      search, order_by, is_starred_on_web,
    } = req.query;

    const data = await tokko("/property/", {
      limit,
      offset,
      ...(operation_type     && { operation_type }),
      ...(property_type      && { property_type  }),
      ...(search             && { search          }),
      ...(order_by           && { order_by        }),
      ...(is_starred_on_web  && { is_starred_on_web: true }),
    });

    res.json({
      meta: {
        total_count: data.meta?.total_count || 0,
        limit:       parseInt(limit),
        offset:      parseInt(offset),
      },
      objects: (data.objects || []).map(normalize),
    });
  } catch (err) {
    console.error("[GET /api/properties]", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/properties/:id ────────────────────────────────────────
app.get("/api/properties/:id", async (req, res) => {
  try {
    const data = await tokko(`/property/${req.params.id}/`);
    res.json(normalize(data));
  } catch (err) {
    console.error(`[GET /api/properties/${req.params.id}]`, err.message);
    res.status(err.message.includes("404") ? 404 : 500).json({ error: err.message });
  }
});

// ── GET /api/locations ─────────────────────────────────────────────
// Útil para poblar el filtro de barrios/ciudades
app.get("/api/locations", async (req, res) => {
  try {
    const data = await tokko("/location/", { show_empty: false });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/property-types ────────────────────────────────────────
app.get("/api/property-types", async (req, res) => {
  try {
    const data = await tokko("/property/types/");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /health ────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Start ─────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅  Proxy Tokko corriendo en http://localhost:${PORT}`);
  console.log(`    API Key: ${API_KEY.slice(0, 6)}...${API_KEY.slice(-4)}`);
  console.log(`\n   Endpoints disponibles:`);
  console.log(`   GET /api/properties`);
  console.log(`   GET /api/properties/:id`);
  console.log(`   GET /api/locations`);
  console.log(`   GET /api/property-types`);
  console.log(`   GET /health\n`);
});
