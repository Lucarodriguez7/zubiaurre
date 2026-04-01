import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import { useFavorites } from "../hooks/useFavorites";
import { mockProperties } from "../utils/mockData";
import config from "../config";

export default function Favorites() {
  const { favs, clearAll, count } = useFavorites();

  // Get property objects for favorited IDs
  // When using Tokko, these come from mock as fallback — in production
  // you'd fetch them from the API using the IDs
  const favProperties = mockProperties.filter((p) => favs.includes(p.id));

  return (
    <>
      <Navbar forceSolid />
      <main style={{ paddingTop: "var(--nav-h)", minHeight: "80vh" }}>
        <div className="page-hero page-hero--dark">
          <div className="container">
            <span className="eyebrow">Tu lista personal</span>
            <h1 className="display page-hero__title">Propiedades guardadas</h1>
            <p className="page-hero__sub">{count} {count === 1 ? "propiedad guardada" : "propiedades guardadas"}</p>
          </div>
        </div>

        <div className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
          {count === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--surface-alt)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--border-dark)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              </div>
              <p style={{ fontSize: "1.125rem", fontFamily: "var(--font-display)", fontWeight: 400 }}>No tenés propiedades guardadas</p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", maxWidth: 340, lineHeight: 1.65 }}>
                Hacé click en el corazón de cualquier propiedad para guardarla acá.
              </p>
              <Link to="/propiedades" className="btn btn-primary btn-lg" style={{ marginTop: "0.5rem" }}>
                Explorar propiedades
              </Link>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                  {count} {count === 1 ? "propiedad guardada" : "propiedades guardadas"}
                </p>
                <button className="btn btn-outline btn-sm" onClick={clearAll}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                  Limpiar lista
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
                {favProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
