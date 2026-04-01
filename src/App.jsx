import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import config from "./config";

import Home           from "./pages/Home";
import Properties     from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Tasacion       from "./pages/Tasacion";
import Proceso        from "./pages/Proceso";
import About          from "./pages/About";
import Contact        from "./pages/Contact";
import Favorites      from "./pages/Favorites";
import WhatsAppFloat  from "./components/WhatsAppFloat";

// Scroll to top on route change
function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Inject CSS variables from config.colors and config.fonts — NO process.env
function injectTheme() {
  const r = document.documentElement;
  const { colors: c, fonts: f, brand, seo } = config;
  const vars = {
    "--primary":      c.primary,
    "--accent":       c.accent,
    "--accent-dark":  c.accentDark,
    "--bg":           c.background,
    "--surface":      c.surface,
    "--surface-alt":  c.surfaceAlt,
    "--text":         c.text,
    "--text-muted":   c.textMuted,
    "--text-light":   c.textLight,
    "--border":       c.border,
    "--border-dark":  c.borderDark,
    "--overlay":      c.overlay,
    "--hero-overlay": c.heroOverlay,
    "--font-display": f.heading,
    "--font-body":    f.body,
    "--font-accent":  f.accent || f.heading,
    "--font-data":    f.data || "monospace",
  };
  Object.entries(vars).forEach(([k, v]) => r.style.setProperty(k, v));

  // Google Fonts
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = f.googleFontsUrl;
  document.head.appendChild(link);

  // SEO
  document.title = `${brand.name} | Inmobiliaria Premium`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", brand.slogan);
}

export default function App() {
  useEffect(() => { injectTheme(); }, []);

  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route path="/"                        element={<Home />} />
        <Route path="/propiedades"             element={<Properties />} />
        <Route path="/propiedades/:slug"       element={<PropertyDetail />} />
        <Route path="/tasacion"                element={<Tasacion />} />
        <Route path="/proceso"                 element={<Proceso />} />
        <Route path="/nosotros"                element={<About />} />
        <Route path="/contacto"                element={<Contact />} />
        <Route path="/favoritos"               element={<Favorites />} />
      </Routes>
      <WhatsAppFloat />
    </BrowserRouter>
  );
}
