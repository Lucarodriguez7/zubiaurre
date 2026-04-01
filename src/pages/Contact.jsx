import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import config from "../config";
import "./Contact.css";

export default function Contact() {
  const { contact, brand } = config;
  const [form, setForm] = useState({ nombre: "", tel: "", email: "", tipo: "", mensaje: "" });
  const [sent, setSent] = useState(false);
  const waUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => {
    const msg = `Consulta desde el sitio web:\n• Nombre: ${form.nombre}\n• Tel: ${form.tel}\n• Email: ${form.email}\n• Consulta: ${form.tipo}\n• Mensaje: ${form.mensaje}`;
    window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <>
      <Navbar forceSolid />
      <main className="contact-page">

        {/* HEADER */}
        <div className="page-hero page-hero--dark">
          <div className="container">
            <span className="eyebrow">Estamos para ayudarte</span>
            <h1 className="display page-hero__title">Contacto</h1>
            <p className="page-hero__sub">Escribinos, llamanos o visitanos. Te respondemos en minutos.</p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="contact-layout">

              {/* INFO */}
              <div className="contact-info">
                <div className="contact-info__cards">
                  {contact.phone && (
                    <a href={`tel:${contact.phone}`} className="contact-info-card">
                      <div className="contact-info-card__icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .15h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.12-1.16a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.16v2.76z"/></svg>
                      </div>
                      <div>
                        <p className="contact-info-card__label">Teléfono</p>
                        <p className="contact-info-card__value">{contact.phone}</p>
                      </div>
                    </a>
                  )}
                  {contact.email && (
                    <a href={`mailto:${contact.email}`} className="contact-info-card">
                      <div className="contact-info-card__icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      </div>
                      <div>
                        <p className="contact-info-card__label">Email</p>
                        <p className="contact-info-card__value">{contact.email}</p>
                      </div>
                    </a>
                  )}
                  {contact.address && (
                    <a href={contact.maps || "#"} target="_blank" rel="noopener noreferrer" className="contact-info-card">
                      <div className="contact-info-card__icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      </div>
                      <div>
                        <p className="contact-info-card__label">Dirección</p>
                        <p className="contact-info-card__value">{contact.address}</p>
                      </div>
                    </a>
                  )}
                  {contact.hours && (
                    <div className="contact-info-card">
                      <div className="contact-info-card__icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      </div>
                      <div>
                        <p className="contact-info-card__label">Horarios</p>
                        <p className="contact-info-card__value">{contact.hours}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* WhatsApp CTA */}
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="contact-wa-cta">
                  <div className="contact-wa-cta__inner">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    <div>
                      <p style={{ fontWeight: 500, fontSize: "1rem" }}>Escribinos por WhatsApp</p>
                      <p style={{ fontSize: "0.8125rem", opacity: 0.75 }}>Respondemos en minutos</p>
                    </div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
              </div>

              {/* FORM */}
              <div className="contact-form-wrap">
                <div className="contact-form-card">
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 400, marginBottom: "0.375rem" }}>
                    Envianos tu consulta
                  </h2>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "1.75rem" }}>
                    Completá el formulario y te respondemos por WhatsApp.
                  </p>

                  {sent ? (
                    <div className="contact-sent">
                      <div className="contact-sent__icon">✓</div>
                      <h3>¡Consulta enviada!</h3>
                      <p>Te contactaremos a la brevedad.</p>
                      <button className="btn btn-outline btn-sm" onClick={() => setSent(false)}>Nueva consulta</button>
                    </div>
                  ) : (
                    <div className="contact-form">
                      <div className="form-row">
                        <div className="form-field">
                          <label className="form-label">Nombre *</label>
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
                        <label className="form-label">Tipo de consulta</label>
                        <select name="tipo" className="form-select" value={form.tipo} onChange={handleChange}>
                          <option value="">Seleccionar...</option>
                          <option value="Compra de propiedad">Compra de propiedad</option>
                          <option value="Venta de propiedad">Venta de propiedad</option>
                          <option value="Alquiler">Alquiler</option>
                          <option value="Tasación">Tasación gratuita</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label className="form-label">Mensaje</label>
                        <textarea name="mensaje" className="form-textarea" placeholder="Contanos en qué podemos ayudarte..." value={form.mensaje} onChange={handleChange} rows={4} />
                      </div>
                      <button
                        className="btn btn-wa"
                        style={{ width: "100%", justifyContent: "center" }}
                        onClick={handleSubmit}
                        disabled={!form.nombre || !form.tel}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        Enviar por WhatsApp
                      </button>
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
