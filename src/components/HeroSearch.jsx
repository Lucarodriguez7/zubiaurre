import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSearch.css";

const OPERATIONS = ["Comprar", "Alquilar"];
const TYPES      = ["Todos", "Departamento", "Casa", "Oficina", "Local", "Terreno", "PH"];
const ZONES      = ["Todas las zonas", "Centro", "Güemes", "Los Acantilados", "Playa Grande", "Sierra de los Padres", "Microcentro"];

export default function HeroSearch() {
  const [op,   setOp]   = useState("Comprar");
  const [type, setType] = useState("Todos");
  const [zone, setZone] = useState("Todas las zonas");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (op   === "Alquilar")              params.set("op",   "alquiler");
    else                                  params.set("op",   "venta");
    if (type !== "Todos")                 params.set("type", type.toLowerCase());
    if (zone !== "Todas las zonas")       params.set("q",    zone);
    navigate(`/propiedades?${params.toString()}`);
  };

  return (
    <div className="hero-search animate-fade-up delay-4">
      {/* Operation tabs */}
      <div className="hero-search__tabs">
        {OPERATIONS.map((o) => (
          <button
            key={o}
            className={`hero-search__tab ${op === o ? "hero-search__tab--active" : ""}`}
            onClick={() => setOp(o)}
          >
            {o}
          </button>
        ))}
      </div>

      {/* Search bar — top-left radius = 0 when first tab active, else rounded */}
      <div className={`hero-search__bar ${op === "Comprar" ? "hero-search__bar--first-active" : "hero-search__bar--second-active"}`}>
        <div className="hero-search__field">
          <label className="hero-search__label">Tipo</label>
          <select
            className="hero-search__select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="hero-search__divider" />

        <div className="hero-search__field">
          <label className="hero-search__label">Zona</label>
          <select
            className="hero-search__select"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
          >
            {ZONES.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
        </div>

        <button className="hero-search__btn" onClick={handleSearch}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <span>Buscar</span>
        </button>
      </div>
    </div>
  );
}
