import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import config from "../config";
import "./Tasacion.css";

export default function Tasacion() {
  const { tasacion, contact } = config;
  const [form, setForm] = useState({ nombre: "", email: "", tel: "", direccion: "", tipo: "", metros: "", mensaje: "", });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const msg =
      `Solicitud de tasación:\n` +
      `• Nombre: ${form.nombre}\n` +
      `• Email: ${form.email}\n` +
      `• Tel: ${form.tel}\n` +
      `• Dirección: ${form.direccion}\n` +
      `• Tipo: ${form.tipo}\n` +
      `• Metros: ${form.metros}\n` +
      `• Notas: ${form.mensaje}`;
    window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <>
      <Navbar forceSolid />
      <main className="tasacion-page">

        {/* HEADER */}
        <div className="page-hero page-hero--dark">
          <div className="container">
            <span className="eyebrow">{tasacion.subtitle}</span>
            <h1 className="display page-hero__title">{tasacion.title}</h1>
            <p className="page-hero__sub">
              Nuestros tasadores analizan tu propiedad con datos de mercado reales.<br />
              Sin costo, sin compromiso.
            </p>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <section className="section">
          <div className="container">
            <div className="tasacion-layout">

              {/* LEFT — info */}
              <div className="tasacion-info">
                <span className="eyebrow">¿Por qué tasamos con nosotros?</span>
                <h2 className="display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginBottom: "1.25rem" }}>
                  {tasacion.headline.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}
                </h2>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>{tasacion.body}</p>

                {/* Benefits */}
                <div className="tasacion-benefits">
                  {tasacion.benefits.map((b) => (
                    <div key={b.text} className="tasacion-benefit-item">
                      <div className="tasacion-benefit-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <span>{b.text}</span>
                    </div>
                  ))}
                </div>

                {/* Image */}
                <div className="tasacion-img-wrap">
                  <img src={tasacion.image} alt="Tasación profesional" loading="lazy" />
                </div>

                {/* Process mini */}
                <div className="tasacion-how">
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 400, marginBottom: "1.25rem" }}>¿Cómo funciona?</h3>
                  {[
                    { n: "1", t: "Completás el formulario", b: "Nos contás los datos básicos de tu propiedad." },
                    { n: "2", t: "Un tasador te contacta", b: "En menos de 24hs un profesional se comunica con vos." },
                    { n: "3", t: "Recibís la tasación", b: "Te entregamos un informe detallado sin costo." },
                  ].map((step) => (
                    <div key={step.n} className="how-step">
                      <div className="how-step__num">{step.n}</div>
                      <div>
                        <p style={{ fontWeight: 500, marginBottom: 2 }}>{step.t}</p>
                        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{step.b}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — form */}
              <div className="tasacion-form-wrap">
                <div className="tasacion-form-card">
                  <h2 className="tasacion-form-title">{tasacion.formTitle}</h2>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                    Al enviar el formulario, te redirigimos a WhatsApp con tus datos pre-cargados.
                  </p>

                  {sent ? (
                    <div className="tasacion-sent">
                      <div className="tasacion-sent__icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <h3>¡Solicitud enviada!</h3>
                      <p>Un asesor se contactará con vos en menos de 24 horas.</p>
                      <button className="btn btn-outline btn-sm" onClick={() => setSent(false)}>Nueva consulta</button>
                    </div>
                  ) : (
                    <div className="tasacion-form">
                      <div className="form-row">
                        <div className="form-field">
                          <label className="form-label">Nombre completo *</label>
                          <input name="nombre" className="form-input" placeholder="Tu nombre" value={form.nombre} onChange={handleChange} />
                        </div>
                        <div className="form-field">
                          <label className="form-label">Teléfono *</label>
                          <input name="tel" type="tel" className="form-input" placeholder="+54 9 223..." value={form.tel} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="form-field">
                        <label className="form-label">Email</label>
                        <input name="email" type="email" className="form-input" placeholder="tu@email.com" value={form.email} onChange={handleChange} />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Dirección de la propiedad *</label>
                        <input name="direccion" className="form-input" placeholder="Calle, número, piso..." value={form.direccion} onChange={handleChange} />
                      </div>
                      <div className="form-row">
                        <div className="form-field">
                          <label className="form-label">Tipo de propiedad</label>
                          <select name="tipo" className="form-select" value={form.tipo} onChange={handleChange}>
                            <option value="">Seleccionar...</option>
                            <option value="Departamento">Departamento</option>
                            <option value="Casa">Casa</option>
                            <option value="Oficina">Oficina</option>
                            <option value="Local">Local comercial</option>
                            <option value="Terreno">Terreno</option>
                          </select>
                        </div>
                        <div className="form-field">
                          <label className="form-label">Superficie aprox. (m²)</label>
                          <input name="metros" type="number" className="form-input" placeholder="Ej: 80" value={form.metros} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="form-field">
                        <label className="form-label">Información adicional</label>
                        <textarea name="mensaje" className="form-textarea" placeholder="Antigüedad, estado, reformas, etc." value={form.mensaje} onChange={handleChange} rows={3} />
                      </div>
                      <button
                        className="btn btn-wa"
                        style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
                        onClick={handleSubmit}
                        disabled={!form.nombre || !form.tel || !form.direccion}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        Solicitar tasación gratuita
                      </button>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center", marginTop: "0.75rem" }}>
                        * Campos obligatorios
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
