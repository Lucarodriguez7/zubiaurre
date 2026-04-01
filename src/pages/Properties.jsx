import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import config from "../config";
import { useProperties } from "../hooks/useProperties";
import "./Properties.css";

const OPERATIONS   = ["todas", "venta", "alquiler"];
const TYPES        = ["todos", "departamento", "casa", "oficina", "local", "terreno"];
const SORT_OPTIONS = [
  { value: "default",   label: "Destacadas primero" },
  { value: "price-asc", label: "Menor precio" },
  { value: "price-desc",label: "Mayor precio" },
  { value: "new",       label: "Más recientes" },
];

export default function Properties() {
  const [op,        setOp]        = useState("todas");
  const [type,      setType]      = useState("todos");
  const [sort,      setSort]      = useState("default");
  const [search,    setSearch]    = useState("");
  const [view,      setView]      = useState(config.properties.defaultView || "grid");

  const { properties: filtered, total, loading, error } = useProperties({
    operation:     op   !== "todas" ? op   : undefined,
    type:          type !== "todos" ? type : undefined,
    search:        search.trim() || undefined,
    sort,
    limit: 24,
    offset: 0,
  });

  return (
    <>
      <Navbar forceSolid />
      <main className="props-page">

        {/* Page header */}
        <div className="props-page__header">
          <div className="container">
            <span className="eyebrow">{config.properties.listSubtitle}</span>
            <h1 className="display props-page__title">{config.properties.listTitle}</h1>
          </div>
        </div>

        {/* Filters bar */}
        <div className="props-filters">
          <div className="container">
            <div className="props-filters__inner">
              {/* Search */}
              <div className="props-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <input
                  type="text" placeholder="Buscar por zona, barrio, tipo..."
                  className="props-search__input"
                  value={search} onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Operación */}
              <div className="filter-pills">
                {OPERATIONS.map((o) => (
                  <button key={o} className={`filter-pill ${op === o ? "filter-pill--on" : ""}`} onClick={() => setOp(o)}>
                    {o === "todas" ? "Todas" : o.charAt(0).toUpperCase() + o.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tipo */}
              <select className="form-select props-type-select" value={type} onChange={(e) => setType(e.target.value)}>
                {TYPES.map((t) => (
                  <option key={t} value={t}>{t === "todos" ? "Todos los tipos" : t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>

              {/* Sort */}
              <select className="form-select" style={{ minWidth: 180 }} value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORT_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>

              {/* View toggle */}
              <div className="view-toggle hide-mobile">
                <button className={`view-btn ${view === "grid" ? "view-btn--on" : ""}`} onClick={() => setView("grid")} title="Grilla">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                </button>
                <button className={`view-btn ${view === "list" ? "view-btn--on" : ""}`} onClick={() => setView("list")} title="Lista">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="container props-results">
          <p className="props-count">{loading ? "Cargando..." : `${total || filtered.length} ${(total || filtered.length) === 1 ? "propiedad" : "propiedades"}`}</p>

          {loading ? (
            <div className={`props-grid ${view === "list" ? "props-grid--list" : ""}`}>
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="skeleton" style={{ height: 360, borderRadius: "var(--radius-lg)" }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="props-empty">
              <p>No encontramos propiedades con esos filtros.</p>
              <button className="btn btn-outline" onClick={() => { setOp("todas"); setType("todos"); setSearch(""); }}>
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className={`props-grid ${view === "list" ? "props-grid--list" : ""}`}>
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} size={view === "list" ? "large" : "normal"} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
