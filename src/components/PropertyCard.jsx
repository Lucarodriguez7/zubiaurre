import React from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import "./PropertyCard.css";

function fmt(price, currency) {
  if (!price) return "Consultar";
  return `${currency === "USD" ? "USD" : "$"} ${price.toLocaleString("es-AR")}`;
}

export default function PropertyCard({ property, size = "normal" }) {
  const { slug, id, title, address, neighborhood, price, currency,
          operation, type, rooms, bathrooms, surfaceCovered, surfaceTotal,
          photos, featured, isNew, status, subtitle } = property;

  const href  = `/propiedades/${slug || id}`;
  const photo = photos?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";
  const isSold = status === "vendido";
  const isReserved = status === "reservado";

  return (
    <Link to={href} className={`pcard card-hover ${size === "large" ? "pcard--large" : ""}`}>
      {/* Image */}
      <div className="pcard__img-wrap">
        <img src={photo} alt={title} className="pcard__img" loading="lazy" />
        <div className="pcard__img-overlay" />

        {/* Badges */}
        <FavoriteButton propertyId={id} style={{ position:"absolute", top:10, right:10, zIndex:2 }} />
        <div className="pcard__badges">
          <span className={`badge badge-${operation}`}>{operation === "venta" ? "Venta" : "Alquiler"}</span>
          {isNew     && <span className="badge badge-nuevo">Nuevo</span>}
          {isReserved && <span className="badge badge-reservado">Reservado</span>}
          {isSold    && <span className="badge badge-vendido">Vendido</span>}
        </div>

        {/* Photo count */}
        {photos?.length > 1 && (
          <span className="pcard__photo-count">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            {photos.length}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="pcard__body">
        <div className="pcard__meta">
          <span className="pcard__type">{type}</span>
          {neighborhood && <span className="pcard__neighborhood">{neighborhood}</span>}
        </div>

        <h3 className="pcard__title">{title}</h3>
        {size === "large" && subtitle && <p className="pcard__subtitle">{subtitle}</p>}

        <p className="pcard__address">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {address}
        </p>

        {/* Stats */}
        <div className="pcard__stats">
          {rooms > 0 && (
            <span className="pcard__stat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
              {rooms} {rooms === 1 ? "amb." : "ambs."}
            </span>
          )}
          {bathrooms > 0 && (
            <span className="pcard__stat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M4 12h16M4 12V6a2 2 0 012-2h4M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6"/></svg>
              {bathrooms} {bathrooms === 1 ? "baño" : "baños"}
            </span>
          )}
          {(surfaceCovered || surfaceTotal) && (
            <span className="pcard__stat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="3" width="18" height="18" rx="1"/></svg>
              {surfaceCovered || surfaceTotal} m²
            </span>
          )}
        </div>

        {/* Price */}
        <div className="pcard__footer">
          <div className="pcard__price-wrap">
            <p className="pcard__price font-data">
              {fmt(price, currency)}
              {operation === "alquiler" && <span className="pcard__price-period">/mes</span>}
            </p>
          </div>
          <span className="pcard__cta">Ver más →</span>
        </div>
      </div>
    </Link>
  );
}
