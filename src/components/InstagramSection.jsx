import React from "react";
import config from "../config";
import "./InstagramSection.css";

// Placeholder images for the Instagram grid
// In production: replace with real embed or Instagram API
const PLACEHOLDER_POSTS = [
  { id: 1, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80", likes: 142 },
  { id: 2, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80", likes: 98  },
  { id: 3, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", likes: 215 },
  { id: 4, img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&q=80", likes: 87  },
  { id: 5, img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&q=80", likes: 176 },
  { id: 6, img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80", likes: 63  },
];

export default function InstagramSection() {
  const { instagram, instagramHandle } = config.contact;
  if (!instagram) return null;

  return (
    <section className="insta section-sm">
      <div className="container">

        {/* Header */}
        <div className="insta__header" data-aos="aos-fade-up">
          <div className="insta__brand">
            <div className="insta__logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="26" height="26">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>
            <div>
              <h2 className="insta__title display">Seguinos en Instagram</h2>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="insta__handle"
              >
                {instagramHandle || "@" + instagram.split("/").pop()}
              </a>
            </div>
          </div>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline insta__cta hide-mobile"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Ver perfil completo
          </a>
        </div>

        {/* Grid */}
        <div className="insta__grid" data-aos="aos-fade-up" data-aos-delay="100">
          {PLACEHOLDER_POSTS.map((post, i) => (
            <a
              key={post.id}
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="insta__post"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <img src={post.img} alt={`Post ${post.id}`} loading="lazy" className="insta__post-img" />
              <div className="insta__post-overlay">
                <div className="insta__post-stats">
                  <span>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                    {post.likes}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="insta__mobile-cta hide-desktop" data-aos="aos-fade-up">
          <a href={instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ width: "100%", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Seguir en Instagram
          </a>
        </div>

      </div>
    </section>
  );
}
