import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import config from "../config";
import "./About.css";

export default function About() {
  const { about, brand } = config;

  return (
    <>
      <Navbar forceSolid />
      <main className="about-page">

        {/* HEADER */}
        <div className="page-hero page-hero--dark">
          <div className="container">
            <span className="eyebrow">{about.subtitle}</span>
            <h1 className="display page-hero__title">{about.title}</h1>
          </div>
        </div>

        {/* STORY */}
        <section className="section">
          <div className="container">
            <div className="about-story">
              <div className="about-story__img-wrap">
                <img src={about.image} alt="Nuestro equipo" loading="lazy" className="about-story__img" />
                <div className="about-story__badge">
                  <p className="about-story__badge-year">{brand.foundedYear}</p>
                  <p className="about-story__badge-label">Desde</p>
                </div>
              </div>
              <div className="about-story__content">
                <span className="eyebrow">Nuestra historia</span>
                <h2 className="display about-story__h2">
                  {about.headline.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}
                </h2>
                <p className="about-story__body">{about.body}</p>

                {/* Stats */}
                <div className="about-stats">
                  {config.hero.stats.map((s) => (
                    <div key={s.label} className="about-stat">
                      <p className="about-stat__value">{s.value}</p>
                      <p className="about-stat__label">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="section" style={{ background: "var(--primary)" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 3.5rem" }}>
              <span className="eyebrow">Lo que nos define</span>
              <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text-light)", marginTop: "0.5rem" }}>
                Nuestros valores
              </h2>
            </div>
            <div className="about-values">
              {about.values.map((v, i) => (
                <div key={v.title} className="about-value-card">
                  <p className="about-value-num">0{i + 1}</p>
                  <div className="divider-accent" style={{ marginBottom: "1rem" }} />
                  <h3 className="about-value-title">{v.title}</h3>
                  <p className="about-value-body">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: 480, margin: "0 auto 3.5rem" }}>
              <span className="eyebrow">Las personas detrás</span>
              <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginTop: "0.5rem" }}>
                Nuestro equipo
              </h2>
            </div>
            <div className="about-team">
              {about.team.map((member) => (
                <div key={member.name} className="team-card">
                  <div className="team-card__img-wrap">
                    <img src={member.image} alt={member.name} loading="lazy" className="team-card__img" />
                  </div>
                  <div className="team-card__info">
                    <p className="team-card__name">{member.name}</p>
                    <p className="team-card__role">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-sm" style={{ background: "var(--surface-alt)", borderTop: "1px solid var(--border)" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <h2 className="display" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", marginBottom: "1rem" }}>
              ¿Querés trabajar con nosotros?
            </h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "2rem", maxWidth: 480, margin: "0 auto 2rem" }}>
              Contactanos y te asesoramos sin compromiso.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/contacto" className="btn btn-primary btn-lg">Hablar con el equipo</Link>
              <Link to="/propiedades" className="btn btn-outline btn-lg">Ver propiedades</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
