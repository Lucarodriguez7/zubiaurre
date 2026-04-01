// ─────────────────────────────────────────────────────────────────
//  tokkoNormalizer.js
//  Traduce la respuesta cruda de Tokko Broker al formato interno
//  del template. Si la API de Tokko cambia algo, solo tocás este
//  archivo — las páginas no se enteran de nada.
// ─────────────────────────────────────────────────────────────────

// Mapa de tipos de operación de Tokko → interno
const OP_MAP = {
  1: "venta",
  2: "alquiler",
  3: "alquiler temporario",
};

// Mapa de tipos de propiedad de Tokko → interno
const TYPE_MAP = {
  1:  "departamento",
  2:  "casa",
  3:  "ph",
  4:  "local",
  5:  "oficina",
  6:  "galpon",
  7:  "terreno",
  8:  "cochera",
  9:  "campo",
  10: "quinta",
  11: "hotel",
  13: "departamento",  // duplex → departamento
  14: "casa",          // chalet → casa
};

/**
 * Normaliza UNA propiedad de Tokko al formato interno.
 * @param {Object} raw - objeto crudo de la API de Tokko
 * @returns {Object} - propiedad en formato interno del template
 */
export function normalizeProperty(raw) {
  if (!raw) return null;

  // ── Operación y precio ──────────────────────────────────────────
  const firstOp   = raw.operations?.[0] || {};
  const firstPrice = firstOp.prices?.[0] || {};

  const operation = OP_MAP[firstOp.operation_type] || "venta";
  const price     = parseFloat(firstPrice.price) || 0;
  const currency  = firstPrice.currency === "USD" ? "USD" : "ARS";

  // ── Expensas ────────────────────────────────────────────────────
  const expenses         = raw.expenses        ? parseFloat(raw.expenses)        : null;
  const expensesCurrency = raw.expenses_currency || "ARS";

  // ── Fotos ───────────────────────────────────────────────────────
  const photos = (raw.photos || [])
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((ph) => ph.image || ph.thumb)
    .filter(Boolean);

  // Fallback si no hay fotos
  if (photos.length === 0) {
    photos.push("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80");
  }

  // ── Agente ──────────────────────────────────────────────────────
  const agent = raw.agents?.[0] || null;

  // ── Tipo ────────────────────────────────────────────────────────
  const typeId = raw.type?.id;
  const type   = TYPE_MAP[typeId] || raw.type?.name?.toLowerCase() || "propiedad";

  // ── Slug ────────────────────────────────────────────────────────
  // Tokko no tiene slug, lo generamos del título + id
  const slug = raw.publication_title
    ? slugify(raw.publication_title) + "-" + raw.id
    : String(raw.id);

  // ── Status ──────────────────────────────────────────────────────
  let status = "disponible";
  if (raw.status === 2 || raw.reserved)  status = "reservado";
  if (raw.status === 3 || raw.sold)      status = "vendido";

  // ── Tags / comodidades ──────────────────────────────────────────
  const amenities = (raw.tags || []).map((t) => t.name).filter(Boolean);
  const highlights = amenities.slice(0, 4);

  return {
    // Identidad
    id:                raw.id,
    slug,
    title:             raw.publication_title || raw.address || "Propiedad",
    subtitle:          buildSubtitle(raw, operation),
    description:       raw.description || raw.description_only || "",

    // Ubicación
    address:           raw.address           || "",
    neighborhood:      raw.neighborhood?.name || raw.location?.name || "",
    city:              raw.location?.parent?.name || "",
    lat:               parseFloat(raw.geo_lat)  || null,
    lng:               parseFloat(raw.geo_long) || null,

    // Operación y precio
    operation,
    price,
    currency,
    expenses,
    expensesCurrency,

    // Tipo y estado
    type,
    status,
    featured:          Boolean(raw.is_starred_on_web),
    isNew:             isNewProperty(raw.created_at),

    // Métricas
    rooms:             parseInt(raw.room_amount)     || 0,
    bedrooms:          parseInt(raw.bedroom_amount)  || 0,
    bathrooms:         parseInt(raw.bathroom_amount) || 0,
    garage:            parseInt(raw.parking_lot_amount) || 0,
    surfaceCovered:    parseFloat(raw.roofed_surface)  || 0,
    surfaceTotal:      parseFloat(raw.total_surface)   || 0,
    surfaceTerrace:    parseFloat(raw.unroofed_surface)|| 0,
    floor:             raw.floor != null ? parseInt(raw.floor) : null,
    totalFloors:       raw.floors ? parseInt(raw.floors) : null,
    orientation:       raw.orientation || null,
    antiquity:         raw.age != null ? parseInt(raw.age) : null,

    // Media
    photos,
    videoUrl:          raw.videos?.[0]?.player_url || null,
    virtualTourUrl:    raw.virtual_tour_url || null,

    // Comodidades
    amenities,
    highlights,

    // Agente
    agent: agent ? {
      name:  agent.name  || "Asesor",
      phone: agent.phone || "",
      photo: agent.photo || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    } : null,
  };
}

/**
 * Normaliza una lista de propiedades de Tokko.
 */
export function normalizeList(rawList) {
  return (rawList || []).map(normalizeProperty).filter(Boolean);
}

// ── Helpers internos ─────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")   // quita tildes
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

function buildSubtitle(raw, operation) {
  const parts = [];
  if (raw.type?.name)        parts.push(raw.type.name);
  if (raw.room_amount > 0)   parts.push(`${raw.room_amount} amb.`);
  if (raw.roofed_surface > 0) parts.push(`${raw.roofed_surface} m²`);
  return parts.join(" · ");
}

function isNewProperty(createdAt) {
  if (!createdAt) return false;
  const created = new Date(createdAt);
  const diffDays = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 30;  // nueva si tiene menos de 30 días
}
