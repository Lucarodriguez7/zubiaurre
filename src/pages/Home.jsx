import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import config from "../config";
import { useFeaturedProperties } from "../hooks/useProperties";
import "./Home.css";
import HeroSearch from "../components/HeroSearch";
import InstagramSection from "../components/InstagramSection";
import MortgageCalculator from "../components/MortgageCalculator";

// ── AOS-style intersection observer hook ─────────────────────────
// Pass `deps` array to re-run observer when async content loads
function useAOS(deps = []) {
  useEffect(() => {
    // Small delay so new DOM elements are painted before we observe
    const timer = setTimeout(() => {
      const els = document.querySelectorAll("[data-aos]:not(.aos-animate)");
      if (!els.length) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.aosDelay || 0);
            setTimeout(() => entry.target.classList.add("aos-animate"), delay);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
      els.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 50);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ── CountUp hook ──────────────────────────────────────────────────
function useCountUp(target, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

// ── Stats Section ─────────────────────────────────────────────────
function StatCard({ value, suffix, label, icon, delay }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, 2000, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const icons = {
    home:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
    clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    star:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  };

  return (
    <div
      ref={ref}
      className="stat-card"
      data-aos="aos-fade-up"
      data-aos-delay={delay}
      style={{ "--delay": `${delay}ms` }}
    >
      <div className="stat-card__icon">{icons[icon]}</div>
      <div className="stat-card__value">
        <span className={`stat-card__number ${visible ? "stat-card__number--visible" : ""}`}>
          {count.toLocaleString("es-AR")}{suffix}
        </span>
      </div>
      <p className="stat-card__label">{label}</p>
    </div>
  );
}

// ── Testimonials ──────────────────────────────────────────────────
function Stars({ n = 5 }) {
  return (
    <div className="stars">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

function Testimonials() {
  const [idx, setIdx]   = useState(0);
  const [dir, setDir]   = useState(1);   // 1 = forward, -1 = back
  const [anim, setAnim] = useState(false);
  const items = config.testimonials;
  const timerRef = useRef(null);

  const go = (next) => {
    if (anim) return;
    setDir(next > idx ? 1 : -1);
    setAnim(true);
    setTimeout(() => {
      setIdx(next);
      setAnim(false);
    }, 420);
  };

  const prev = () => go((idx - 1 + items.length) % items.length);
  const next = () => go((idx + 1) % items.length);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(() => go((idx + 1) % items.length), 5500);
    return () => clearTimeout(timerRef.current);
  }, [idx]);

  const t = items[idx];

  return (
    <section className="testimonials section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }} data-aos="aos-fade-up">
          <span className="eyebrow">Lo que dicen nuestros clientes</span>
          <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
            Historias reales,<br />resultados reales.
          </h2>
        </div>

        <div className="testimonials__stage" data-aos="aos-fade-up" data-aos-delay="100">
          {/* Side gradient shadows */}
          <div className="testimonials__shadow testimonials__shadow--left" />
          <div className="testimonials__shadow testimonials__shadow--right" />

          {/* Card */}
          <div className={`testimonials__track`}>
            <div className={`testimonials__card ${anim ? (dir > 0 ? "testimonials__card--exit-left" : "testimonials__card--exit-right") : "testimonials__card--enter"}`}>
              {/* Google-style header */}
              <div className="tcard__header">
                <img src={t.avatar} alt={t.name} className="tcard__avatar" />
                <div className="tcard__meta">
                  <p className="tcard__name">{t.name}</p>
                  <p className="tcard__role">{t.role}</p>
                  <Stars n={t.rating} />
                </div>
                <div className="tcard__google">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Google</span>
                </div>
              </div>

              <blockquote className="tcard__text">
                <span className="tcard__quote">"</span>
                {t.text}
              </blockquote>
            </div>
          </div>

          {/* Controls */}
          <div className="testimonials__controls">
            <button className="tctrl" onClick={prev} aria-label="Anterior">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            {/* Dots */}
            <div className="testimonials__dots">
              {items.map((_, i) => (
                <button
                  key={i}
                  className={`tdot ${i === idx ? "tdot--active" : ""}`}
                  onClick={() => go(i)}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>

            <button className="tctrl" onClick={next} aria-label="Siguiente">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SERVICE ICONS ─────────────────────────────────────────────────
const ICONS = {
  home:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
  key:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
  chart:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
};

const services = [
  { icon: "home",  title: "Compra y venta",  body: "Asesoramiento completo para encontrar o vender tu propiedad al mejor precio del mercado.", href: "/propiedades" },
  { icon: "key",   title: "Alquileres",       body: "Gestión integral de alquileres, desde la publicación hasta el contrato, sin preocupaciones.", href: "/propiedades" },
  { icon: "chart", title: "Tasaciones",       body: "Valoración profesional respaldada por datos reales y más de 15 años de experiencia local.", href: "/tasacion" },
];

// ── HOME ─────────────────────────────────────────────────────────
export default function Home() {
  const { properties: featured, loading: featuredLoading } = useFeaturedProperties(3);
  useAOS([featuredLoading]);  // re-observe when cards finish loading
  const { hero, brand, stats } = config;
  const waUrl = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(config.contact.whatsappMessage)}`;

  return (
    <>
      <Navbar />
      <main>

        {/* ══ HERO ══ */}
        <section className="home-hero" style={{ backgroundImage: `url(${hero.image})` }}>
          <div className="home-hero__overlay" />

          <div className="home-hero__content container" style={{ paddingTop: "calc(72px + clamp(5rem, 12vh, 9rem))", minHeight: "100svh" }}>

            {/* Top text block */}
            <div className="home-hero__top">
              <span className="home-hero__eyebrow animate-fade-up">{brand.tagline}</span>
              <h1 className="home-hero__h1 animate-fade-up delay-1">
                {hero.headline.split("\n").map((line, i) => (
                  <span key={i}>{line}{i < hero.headline.split("\n").length - 1 && <br />}</span>
                ))}
              </h1>
              <p className="home-hero__sub animate-fade-up delay-2">{hero.subheadline}</p>
              <div className="home-hero__btns animate-fade-up delay-3">
                <Link to="/propiedades" className="btn btn-accent btn-lg">Ver propiedades</Link>
                <Link to="/tasacion" className="btn btn-ghost btn-lg">Tasación gratuita</Link>
              </div>
            </div>

            {/* Bottom search bar — visually separated */}
            <div className="home-hero__bottom animate-fade-up delay-4">
              <HeroSearch />
            </div>

          </div>

          <div className="home-hero__scroll">
            <span className="home-hero__scroll-line" />
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <section className="home-services section-sm">
          <div className="container">
            <div className="home-services__grid">
              {services.map((s, i) => (
                <Link key={s.title} to={s.href} className="service-card" data-aos="aos-fade-up" data-aos-delay={i * 100}>
                  <div className="service-card__icon">{ICONS[s.icon]}</div>
                  <h3 className="service-card__title">{s.title}</h3>
                  <p className="service-card__body">{s.body}</p>
                  <span className="service-card__cta">
                    Conocer más
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══ COUNT-UP STATS ══ */}
        <section className="home-stats section-sm">
          <div className="container">
            <div className="home-stats__inner" data-aos="aos-fade-up">
              <div className="home-stats__header">
                <span className="eyebrow">Nuestros números</span>
                <h2 className="display home-stats__title">
                  Resultados que<br />hablan por sí solos.
                </h2>
              </div>
              <div className="home-stats__grid">
                {stats.map((s, i) => (
                  <StatCard key={s.label} {...s} delay={i * 120} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ FEATURED PROPERTIES ══ */}
        <section className="section" style={{ background: "var(--surface-alt)" }}>
          <div className="container">
            <div className="home-section-header" data-aos="aos-fade-up">
              <div>
                <span className="eyebrow">{config.properties.featuredSubtitle}</span>
                <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                  {config.properties.featuredTitle}
                </h2>
              </div>
              <Link to="/propiedades" className="btn btn-outline hide-mobile">Ver todas →</Link>
            </div>
            <div className="home-props-grid">
              {featuredLoading
                ? [1,2,3].map((i) => <div key={i} className="skeleton" style={{ height: 380, borderRadius: "var(--radius-lg)" }} />)
                : featured.map((p, i) => (
                    <div key={p.id} data-aos="aos-fade-up" data-aos-delay={i * 100}>
                      <PropertyCard property={p} />
                    </div>
                  ))
              }
            </div>
            <div className="home-props-cta hide-desktop" style={{ marginTop: "1.5rem" }}>
              <Link to="/propiedades" className="btn btn-outline" style={{ width: "100%" }}>Ver todas las propiedades →</Link>
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <Testimonials />

        {/* ══ INSTAGRAM ══ */}
        <InstagramSection />

        {/* ══ TASACION BANNER ══ */}
        <section className="home-tasacion section" style={{ overflow: "hidden" }}>
          <div className="container">
            <div className="home-tasacion__inner">
              <div className="home-tasacion__img-wrap" data-aos="aos-fade-right">
                <img src={config.tasacion.image} alt="Tasación" className="home-tasacion__img" loading="lazy" />
                <div className="home-tasacion__img-badge">
                  <span>Gratis</span>
                  <span className="home-tasacion__img-badge-sub">Sin compromiso</span>
                </div>
              </div>
              <div className="home-tasacion__content" data-aos="aos-fade-left">
                <span className="eyebrow">{config.tasacion.subtitle}</span>
                <h2 className="display" style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.875rem)", marginBottom: "1rem" }}>
                  {config.tasacion.title}
                </h2>
                <p className="home-tasacion__body">{config.tasacion.body}</p>
                <div className="home-tasacion__benefits">
                  {config.tasacion.benefits.map((b, i) => (
                    <div key={b.text} className="tasacion-benefit" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="tasacion-benefit__check">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <span>{b.text}</span>
                    </div>
                  ))}
                </div>
                <Link to="/tasacion" className="btn btn-primary btn-lg" style={{ marginTop: "0.75rem" }}>
                  Solicitá tu tasación gratuita
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══ PROCESO PREVIEW ══ */}
        <section className="home-proceso section" style={{ background: "var(--primary)" }}>
          <div className="container">
            <div className="home-section-header" style={{ marginBottom: "3rem" }} data-aos="aos-fade-up">
              <div>
                <span className="eyebrow">{config.proceso.subtitle}</span>
                <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text-light)" }}>
                  {config.proceso.title}
                </h2>
              </div>
              <Link to="/proceso" className="btn btn-ghost hide-mobile">Ver proceso completo →</Link>
            </div>
            <div className="home-proceso-steps">
              {config.proceso.steps.slice(0, 3).map((step, i) => (
                <div key={step.number} className="proceso-step-mini" data-aos="aos-fade-up" data-aos-delay={i * 120}>
                  <p className="proceso-step-mini__num">{step.number}</p>
                  <h3 className="proceso-step-mini__title">{step.title}</h3>
                  <p className="proceso-step-mini__body">{step.body}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }} data-aos="aos-fade-up">
              <Link to="/proceso" className="btn btn-accent btn-lg">Ver proceso completo</Link>
            </div>
          </div>
        </section>

        {/* ══ ABOUT TEASER ══ */}
        <section className="section" style={{ overflow: "hidden" }}>
          <div className="container">
            <div className="home-about">
              <div className="home-about__content" data-aos="aos-fade-right">
                <span className="eyebrow">{config.about.subtitle}</span>
                <h2 className="display" style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.875rem)", marginBottom: "1.25rem" }}>
                  {config.about.headline.split("\n")[0]}
                </h2>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "1.75rem", maxWidth: 480, fontWeight: 400 }}>
                  {config.about.body}
                </p>
                <div className="home-about__values">
                  {config.about.values.map((v, i) => (
                    <div key={v.title} className="about-value" data-aos="aos-fade-up" data-aos-delay={i * 80}>
                      <div className="divider-accent" style={{ marginBottom: "0.75rem" }} />
                      <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 600, marginBottom: 4 }}>{v.title}</h4>
                      <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{v.body}</p>
                    </div>
                  ))}
                </div>
                <Link to="/nosotros" className="btn btn-outline" style={{ marginTop: "2rem" }}>Conocer el equipo →</Link>
              </div>
              <div className="home-about__img-wrap" data-aos="aos-fade-left">
                <img src={config.about.image} alt="Nuestro equipo" className="home-about__img" loading="lazy" />
                <div className="home-about__badge">
                  <p className="home-about__badge-num">{brand.foundedYear}</p>
                  <p className="home-about__badge-label">Desde</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CALCULADORA ══ */}
        <section className="section" style={{ background: "var(--surface-alt)" }}>
          <div className="container">
            <div className="home-section-header" style={{ marginBottom: "2.5rem" }} data-aos="aos-fade-up">
              <div>
                <span className="eyebrow">Herramienta de simulación</span>
                <h2 className="display" style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.875rem)" }}>
                  Calculá tu cuota
                </h2>
              </div>
            </div>
            <div data-aos="aos-fade-up" data-aos-delay="100">
              <MortgageCalculator />
            </div>
          </div>
        </section>

        {/* ══ CTA FINAL ══ */}
        <section className="home-cta section-sm">
          <div className="container">
            <div className="home-cta__inner" data-aos="aos-fade-up">
              <div>
                <h2 className="display" style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.625rem)", color: "var(--text-light)" }}>
                  ¿Listo para el siguiente paso?
                </h2>
                <p style={{ color: "rgba(255,255,255,0.62)", marginTop: "0.875rem", fontSize: "1.0625rem", lineHeight: 1.7, fontWeight: 400 }}>
                  Escribinos y un asesor se contacta con vos en menos de 2 horas.
                </p>
              </div>
              <div className="home-cta__btns">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <Link to="/contacto" className="btn btn-ghost btn-lg">Formulario de contacto</Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}