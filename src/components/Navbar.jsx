import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import config from "../config";
import { useFavorites } from "../hooks/useFavorites";
import "./Navbar.css";

export default function Navbar({ forceSolid = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close on Escape key
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const { count: favCount } = useFavorites();
  const solid = forceSolid || scrolled || !isHome;
  const waUrl = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(config.contact.whatsappMessage)}`;

  return (
    <>
      <nav className={`navbar ${solid ? "navbar--solid" : "navbar--transparent"}`}>
        <div className="navbar__inner container">

          <Link to="/" className="navbar__logo">
            {config.brand.logoImage
              ? <img src={solid ? config.brand.logoImage : (config.brand.logoImageDark || config.brand.logoImage)} alt={config.brand.name} />
              : <span className="navbar__logo-text">{config.brand.logoText || config.brand.name}</span>
            }
          </Link>

          <ul className="navbar__links">
            {config.nav.links.map((l) => (
              <li key={l.href}>
                <NavLink to={l.href} className={({ isActive }) => isActive ? "navbar__link navbar__link--active" : "navbar__link"}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            <Link to="/favoritos" className="navbar__fav-btn" aria-label={`Favoritos (${favCount})`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
              {favCount > 0 && <span className="navbar__fav-count">{favCount}</span>}
            </Link>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="navbar__cta btn btn-accent btn-sm hide-mobile">
              {config.nav.ctaLabel}
            </a>
            <button className="navbar__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen}>
              <span className={`burger-icon ${menuOpen ? "burger-icon--open" : ""}`}>
                <span /><span /><span />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div className={`nav-drawer ${menuOpen ? "nav-drawer--open" : ""}`} role="dialog" aria-modal="true" aria-label="Menú de navegación">

        {/* Close button INSIDE drawer — always visible */}
        <button className="nav-drawer__close" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="nav-drawer__inner">
          {/* Brand in drawer */}
          <p className="nav-drawer__brand">{config.brand.logoText || config.brand.name}</p>

          <ul className="nav-drawer__links">
            {config.nav.links.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="nav-drawer__link">{l.label}</Link>
              </li>
            ))}
          </ul>

          <div className="nav-drawer__footer">
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ width: "100%", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {config.nav.ctaLabel}
            </a>
            <div className="nav-drawer__contact-info">
              {config.contact.phone && <a href={`tel:${config.contact.phone}`} className="nav-drawer__contact">{config.contact.phone}</a>}
              {config.contact.email && <a href={`mailto:${config.contact.email}`} className="nav-drawer__contact">{config.contact.email}</a>}
            </div>
          </div>
        </div>
      </div>

      {menuOpen && <div className="nav-backdrop" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
