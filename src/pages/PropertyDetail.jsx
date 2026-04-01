import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useProperty } from "../hooks/useProperties";
import config from "../config";
import "./PropertyDetail.css";

const fmt = (n, c) => !n ? "Consultar" : `${c === "USD" ? "USD" : "$"} ${n.toLocaleString("es-AR")}`;

const WA_ICON = <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;

export default function PropertyDetail() {
  const { slug } = useParams();
  const { property, loading, error } = useProperty(slug);
  const [activeIdx, setActive] = useState(0);
  const [showAll,   setShowAll] = useState(false);
  const [lightbox,  setLight]  = useState(null);

  if (loading) {
    return (
      <>
        <Navbar forceSolid />
        <div className="pdetail pdetail--loading">
          <div className="container">
            <div className="skeleton pdetail__skeleton-back" />
            <div className="pdetail__layout">
              <div className="pdetail__main">
                <div className="skeleton pdetail__skeleton-gallery" />
                <div style={{ display:"flex", flexDirection:"column", gap:12, marginTop:"1.5rem" }}>
                  {[50,30,70,45].map((w,i) => <div key={i} className="skeleton" style={{ height:16, width:`${w}%` }} />)}
                </div>
              </div>
              <div className="pdetail__sidebar">
                <div className="skeleton" style={{ height:320, borderRadius:"var(--radius-xl)" }} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Navbar forceSolid />
        <div className="pdetail pdetail--error">
          <div className="container">
            <Link to="/propiedades" className="pdetail__back-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              Volver al catálogo
            </Link>
            <h2>Propiedad no encontrada</h2>
            <p>La propiedad que buscás no existe o fue removida.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const {
    title, subtitle, address, neighborhood, city,
    price, currency, expenses, expensesCurrency,
    operation, type, status, rooms, bedrooms, bathrooms, garage,
    surfaceCovered, surfaceTotal, surfaceTerrace,
    floor, totalFloors, orientation, antiquity,
    description, highlights, amenities, photos, agent, isNew, featured,
  } = property;

  const waMsg = `Hola! Me interesa la propiedad "${title}" en ${address} (${fmt(price, currency)}). ¿Podría darme más información? Ref. #${property.id}`;
  const waUrl = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(waMsg)}`;
  const desc  = showAll ? description : description.slice(0, 450) + (description.length > 450 ? "..." : "");

  const stats = [
    rooms          && { label: "Ambientes",     value: rooms },
    bedrooms       && { label: "Dormitorios",   value: bedrooms },
    bathrooms      && { label: "Baños",         value: bathrooms },
    garage         && { label: "Cocheras",      value: garage },
    surfaceCovered && { label: "Sup. cubierta", value: `${surfaceCovered} m²` },
    surfaceTotal   && surfaceTotal !== surfaceCovered && { label: "Sup. total", value: `${surfaceTotal} m²` },
    surfaceTerrace && { label: "Terraza",       value: `${surfaceTerrace} m²` },
    floor != null  && { label: "Piso",          value: floor === 0 ? "PB" : `${floor}°${totalFloors ? `/${totalFloors}` : ""}` },
    orientation    && { label: "Orientación",   value: orientation },
    antiquity != null && { label: "Antigüedad", value: antiquity === 0 ? "A estrenar" : `${antiquity} años` },
  ].filter(Boolean);

  return (
    <>
      <Navbar forceSolid />

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLight(null)}>
          <button className="lightbox__close" onClick={() => setLight(null)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); setLight((lightbox - 1 + photos.length) % photos.length); }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <img src={photos[lightbox]} alt={`${title} — foto ${lightbox + 1}`} className="lightbox__img" onClick={(e) => e.stopPropagation()} />
          <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); setLight((lightbox + 1) % photos.length); }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <p className="lightbox__counter">{lightbox + 1} / {photos.length}</p>
        </div>
      )}

      <main className="pdetail">
        <div className="container">

          {/* ── BACK BUTTON — prominent, at the very top ── */}
          <div className="pdetail__topbar">
            <Link to="/propiedades" className="pdetail__back-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              Volver al catálogo
            </Link>
            <nav className="pdetail__breadcrumb hide-mobile">
              <Link to="/">Inicio</Link><span>/</span>
              <Link to="/propiedades">Propiedades</Link><span>/</span>
              <span>{title}</span>
            </nav>
          </div>

          {/* ── TWO COLUMN LAYOUT ── */}
          <div className="pdetail__layout">

            {/* ── LEFT: gallery + info ── */}
            <article className="pdetail__main">

              {/* GALLERY — inside the content, not full-width */}
              <div className="pdetail__gallery-wrap">
                {/* Main image */}
                <div className="pdetail__gallery-main" onClick={() => setLight(activeIdx)}>
                  <img src={photos[activeIdx]} alt={title} className="pdetail__gallery-hero" />
                  <div className="pdetail__gallery-ui">
                    <span className="pdetail__gallery-count">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      {photos.length} fotos
                    </span>
                    <span className="pdetail__gallery-zoom">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                      Pantalla completa
                    </span>
                  </div>
                  {photos.length > 1 && (
                    <div className="pdetail__gallery-arrows">
                      <button className="gallery-arrow" onClick={(e) => { e.stopPropagation(); setActive((activeIdx - 1 + photos.length) % photos.length); }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                      </button>
                      <button className="gallery-arrow" onClick={(e) => { e.stopPropagation(); setActive((activeIdx + 1) % photos.length); }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Thumbnails strip */}
                {photos.length > 1 && (
                  <div className="pdetail__thumbs">
                    {photos.map((ph, i) => (
                      <button key={i} className={`pdetail__thumb ${i === activeIdx ? "pdetail__thumb--active" : ""}`} onClick={() => setActive(i)}>
                        <img src={ph} alt={`Foto ${i + 1}`} loading="lazy" />
                        {i === 4 && photos.length > 5 && (
                          <div className="pdetail__thumb-more">+{photos.length - 5}</div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* TITLE BLOCK */}
              <div className="pdetail__title-block">
                <div className="pdetail__badges">
                  <span className={`badge badge-${operation}`}>{operation === "venta" ? "En venta" : "En alquiler"}</span>
                  {isNew     && <span className="badge badge-nuevo">Nuevo</span>}
                  {featured  && <span className="badge" style={{ background:"var(--accent)", color:"#fff" }}>Destacado</span>}
                  {status === "reservado" && <span className="badge badge-reservado">Reservado</span>}
                </div>
                <h1 className="pdetail__title">{title}</h1>
                {subtitle && <p className="pdetail__subtitle font-accent">{subtitle}</p>}
                <p className="pdetail__address">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {address}{neighborhood ? `, ${neighborhood}` : ""}{city ? `, ${city}` : ""}
                </p>
              </div>

              {/* STATS */}
              <div className="pdetail__stats">
                {stats.map((s) => (
                  <div key={s.label} className="pdetail__stat">
                    <p className="pdetail__stat-value font-data">{s.value}</p>
                    <p className="pdetail__stat-label">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* HIGHLIGHTS */}
              {highlights?.length > 0 && (
                <div className="pdetail__section">
                  <h2 className="pdetail__section-title">Puntos destacados</h2>
                  <div className="pdetail__highlights">
                    {highlights.map((h) => (
                      <div key={h} className="pdetail__highlight">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* DESCRIPTION */}
              {description && (
                <div className="pdetail__section">
                  <h2 className="pdetail__section-title">Descripción</h2>
                  <div className="pdetail__desc">
                    {desc.split("\n\n").filter(Boolean).map((para, i) => <p key={i}>{para}</p>)}
                  </div>
                  {description.length > 450 && (
                    <button className="btn btn-outline btn-sm" style={{ marginTop:"1rem" }} onClick={() => setShowAll(!showAll)}>
                      {showAll ? "Ver menos" : "Leer descripción completa"}
                    </button>
                  )}
                </div>
              )}

              {/* AMENITIES */}
              {amenities?.length > 0 && (
                <div className="pdetail__section">
                  <h2 className="pdetail__section-title">Comodidades y servicios</h2>
                  <div className="pdetail__amenities">
                    {amenities.map((a) => (
                      <span key={a} className="pdetail__amenity">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--accent)"><circle cx="12" cy="12" r="5"/></svg>
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* MOBILE contact card — shown only on mobile, before footer */}
              <div className="pdetail__mobile-cta hide-desktop">
                <div className="pdetail__price-block">
                  <p className="pdetail__price-label">Precio de {operation}</p>
                  <p className="pdetail__price font-data">{fmt(price, currency)}{operation === "alquiler" && <span className="pdetail__price-period">/mes</span>}</p>
                </div>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ width:"100%", justifyContent:"center" }}>
                  {WA_ICON} Consultar por WhatsApp
                </a>
              </div>
            </article>

            {/* ── RIGHT: sticky contact card ── */}
            <aside className="pdetail__sidebar">
              <div className="pdetail__contact-card">
                <div className="pdetail__price-block">
                  <p className="pdetail__price-label">Precio de {operation}</p>
                  <p className="pdetail__price font-data">
                    {fmt(price, currency)}
                    {operation === "alquiler" && <span className="pdetail__price-period">/mes</span>}
                  </p>
                  {expenses && (
                    <p className="pdetail__expenses">+ Expensas: ${expenses.toLocaleString("es-AR")} {expensesCurrency}/mes</p>
                  )}
                </div>

                <div className="divider" style={{ margin:"1.25rem 0" }} />

                {/* Agent */}
                {agent && (
                  <div className="pdetail__agent">
                    <img src={agent.photo} alt={agent.name} className="pdetail__agent-photo" />
                    <div>
                      <p className="pdetail__agent-name">{agent.name}</p>
                      <p className="pdetail__agent-role">Asesor inmobiliario</p>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="pdetail__cta-stack">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ width:"100%", justifyContent:"center" }}>
                    {WA_ICON} Consultar por WhatsApp
                  </a>
                  {agent?.phone && (
                    <a href={`tel:${agent.phone}`} className="btn btn-outline" style={{ width:"100%", justifyContent:"center" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .15h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.12-1.16a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.16v2.76z"/></svg>
                      Llamar al asesor
                    </a>
                  )}
                  <Link to="/contacto" className="btn btn-outline" style={{ width:"100%", justifyContent:"center" }}>
                    Enviar consulta
                  </Link>
                </div>

                <p className="pdetail__ref">Ref. #{property.id} · {type}</p>
              </div>

              {/* Share */}
              <div className="pdetail__share">
                <p className="pdetail__share-label">Compartir propiedad</p>
                <div className="pdetail__share-btns">
                  <button className="share-btn" onClick={() => navigator.share?.({ title, url: window.location.href }) || navigator.clipboard?.writeText(window.location.href)}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                    Copiar link
                  </button>
                  <a href={`https://wa.me/?text=${encodeURIComponent(`${title} - ${window.location.href}`)}`} target="_blank" rel="noopener noreferrer" className="share-btn">
                    {WA_ICON} WhatsApp
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {/* BOTTOM BACK */}
          <div className="pdetail__bottom-nav">
            <Link to="/propiedades" className="pdetail__back-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              Volver al catálogo de propiedades
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
