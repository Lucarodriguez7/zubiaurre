import React from "react";
import { useFavorites } from "../hooks/useFavorites";
import "./FavoriteButton.css";

export default function FavoriteButton({ propertyId, style = {} }) {
  const { toggle, isFav } = useFavorites();
  const active = isFav(propertyId);

  return (
    <button
      className={`fav-btn ${active ? "fav-btn--active" : ""}`}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(propertyId); }}
      aria-label={active ? "Quitar de favoritos" : "Guardar en favoritos"}
      title={active ? "Quitar de favoritos" : "Guardar en favoritos"}
      style={style}
    >
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
      {active && <span className="fav-btn__ripple" />}
    </button>
  );
}
