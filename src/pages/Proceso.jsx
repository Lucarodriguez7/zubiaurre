import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import config from "../config";
import "./Proceso.css";

const ICONS = {
  search:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  camera:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  users:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  handshake: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  document:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  star:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
};

const waUrl = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent("Hola! Me interesa saber más sobre el proceso de venta.")}`;

export default function Proceso() {
  const { proceso } = config;

  return (
    <>
      <Navbar forceSolid />
      <main className="proceso-page">

        {/* HEADER */}
        <div className="page-hero page-hero--dark">
          <div className="container">
            <span className="eyebrow">{proceso.subtitle}</span>
            <h1 className="display page-hero__title">{proceso.title}</h1>
            <p className="page-hero__sub">{proceso.body}</p>
          </div>
        </div>

        {/* HEADLINE */}
        <section className="section-sm" style={{ background: "var(--surface)" }}>
          <div className="container">
            <div className="proceso-intro">
              <h2 className="display proceso-intro__h2">
                {proceso.headline.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}
              </h2>
              <p className="proceso-intro__body">{proceso.body}</p>
            </div>
          </div>
        </section>

        {/* STEPS */}
        <section className="section">
          <div className="container">
            <div className="proceso-steps">
              {proceso.steps.map((step, idx) => (
                <div key={step.number} className="proceso-step">
                  <div className="proceso-step__aside">
                    <div className="proceso-step__icon">
                      {ICONS[step.icon] || ICONS.star}
                    </div>
                    {idx < proceso.steps.length - 1 && (
                      <div className="proceso-step__line" />
                    )}
                  </div>
                  <div className="proceso-step__content">
                    <span className="proceso-step__num">{step.number}</span>
                    <h3 className="proceso-step__title">{step.title}</h3>
                    <p className="proceso-step__body">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="section" style={{ background: "var(--surface-alt)" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 3rem" }}>
              <span className="eyebrow">¿Por qué elegirnos?</span>
              <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginTop: "0.5rem" }}>
                La diferencia está en los detalles
              </h2>
            </div>
            <div className="proceso-why-grid">
              {[
                { icon: "users",   title: "Compradores calificados",  body: "No perdés tiempo con visitas de personas sin capacidad de compra. Filtramos por vos." },
                { icon: "camera",  title: "Fotografía profesional",   body: "Incluimos sesión fotográfica profesional y descripción redactada por especialistas." },
                { icon: "star",    title: "Máxima exposición",        body: "Publicamos en Zonaprop, Argenprop, MercadoLibre y redes sociales desde el día uno." },
                { icon: "handshake", title: "Negociación experta",   body: "Más de 15 años negociando. Sabemos cuándo ceder y cuándo mantener el precio." },
              ].map((item) => (
                <div key={item.title} className="why-card">
                  <div className="why-card__icon">{ICONS[item.icon]}</div>
                  <h4 className="why-card__title">{item.title}</h4>
                  <p className="why-card__body">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container">
            <div className="proceso-faq">
              <div>
                <span className="eyebrow">Preguntas frecuentes</span>
                <h2 className="display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginTop: "0.5rem", marginBottom: "2rem" }}>
                  Todo lo que necesitás saber
                </h2>
                <FaqItem q="¿Cuánto tiempo tarda en venderse una propiedad?" a="El tiempo promedio en nuestra cartera es de 45 a 90 días. Depende del precio, la ubicación y el estado. Una tasación correcta desde el inicio es clave para vender rápido." />
                <FaqItem q="¿Cuáles son los honorarios de la inmobiliaria?" a="Cobramos una comisión del 3% + IVA sobre el precio de venta, abonada únicamente al concretarse la operación. Sin cargos previos." />
                <FaqItem q="¿Necesito pagar algo por adelantado?" a="No. La tasación, la fotografía y la publicación son sin costo. Solo cobramos si la propiedad se vende." />
                <FaqItem q="¿Qué pasa si la propiedad no se vende?" a="Analizamos la situación con vos. Puede ser una cuestión de precio, de presentación o de estrategia. Siempre tenemos una solución." />
              </div>
              <div className="proceso-cta-card">
                <h3 className="display" style={{ fontSize: "1.75rem", color: "var(--text-light)", marginBottom: "1rem" }}>
                  ¿Querés vender tu propiedad?
                </h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                  Empezá por una tasación gratuita. Hablamos sin compromiso.
                </p>
                <Link to="/tasacion" className="btn btn-accent btn-lg" style={{ width: "100%", justifyContent: "center", marginBottom: "0.75rem" }}>
                  Pedir tasación gratuita
                </Link>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg" style={{ width: "100%", justifyContent: "center" }}>
                  Hablar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={`faq-item ${open ? "faq-item--open" : ""}`}>
      <button className="faq-item__q" onClick={() => setOpen(!open)}>
        {q}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="faq-item__chevron">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && <p className="faq-item__a">{a}</p>}
    </div>
  );
}
