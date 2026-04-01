// ═══════════════════════════════════════════════════════════════
//  CONFIG.JS  —  CLIENTE: ZUBIAURRE PROPIEDADES
//  Cambiá estos valores y el sitio entero se adapta.
//  No hay que tocar ningún componente ni página.
// ═══════════════════════════════════════════════════════════════

const config = {

  // ─── MARCA ────────────────────────────────────────────────────
  brand: {
    name:           "Zubiaurre Propiedades",
    slogan:         "Tu lugar en Tandil, con quienes conocen cada rincón.",
    logoText:       "ZUBIAURRE",
    logoImage:      "https://imgur.com/u4RdvCH.jpg",
    logoImageDark:  "https://imgur.com/u4RdvCH.jpg",
    tagline:        "Inmobiliaria en Tandil",
    foundedYear:    "2010",
  },

  // ─── COLORES ──────────────────────────────────────────────────
  colors: {
    primary:       "#5C3040",   // Bordo/vino oscuro del logo
    accent:        "#C8896A",   // Rosa cobre / rosegold del ícono
    accentDark:    "#A86B50",   // Versión oscura del acento
    background:    "#F7F3F1",   // Fondo cálido con toque rosado
    surface:       "#FFFFFF",
    surfaceAlt:    "#F0E9E5",
    text:          "#2E1A22",   // Casi negro con tono bordo
    textMuted:     "#7A5E66",
    textLight:     "#FFFFFF",
    border:        "#E2D5CF",
    borderDark:    "#C9B0A8",
    overlay:       "rgba(92,48,64,0.65)",
    heroOverlay:   "rgba(92,48,64,0.52)",
  },

  // ─── TIPOGRAFÍA ───────────────────────────────────────────────
  fonts: {
    heading:     "'Fraunces', Georgia, serif",
    body:        "'Plus Jakarta Sans', system-ui, sans-serif",
    accent:      "'Playfair Display', Georgia, serif",
    data:        "'DM Mono', monospace",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Mono:wght@300;400&display=swap",
  },

  // ─── HERO ─────────────────────────────────────────────────────
  hero: {
    headline:    "Encontrá tu lugar\nen el corazón de Tandil.",
    subheadline: "Propiedades en la ciudad y las sierras. Más de 10 años ayudando a familias tandilenses a encontrar su hogar ideal.",
    image:       "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85",
    imageAlt:    "Sierras de Tandil",
    stats: [
      { value: "600+",  label: "Propiedades vendidas" },
      { value: "14",    label: "Años de experiencia" },
      { value: "97%",   label: "Clientes satisfechos" },
    ],
  },

  // ─── NAVEGACIÓN ───────────────────────────────────────────────
  nav: {
    links: [
      { label: "Propiedades", href: "/propiedades" },
      { label: "Tasación",    href: "/tasacion" },
      { label: "Proceso",     href: "/proceso" },
      { label: "Nosotros",    href: "/nosotros" },
      { label: "Contacto",    href: "/contacto" },
    ],
    ctaLabel: "Consultar ahora",
  },

  // ─── PROPIEDADES ──────────────────────────────────────────────
  properties: {
    featuredTitle:    "Propiedades destacadas",
    featuredSubtitle: "Una selección especial en Tandil y las sierras.",
    listTitle:        "Todas las propiedades",
    listSubtitle:     "Explorá nuestro portfolio completo.",
    showMap:          false,
    defaultView:      "grid",
    cardsPerRow:      3,
  },

  // ─── TASACIÓN ─────────────────────────────────────────────────
  tasacion: {
    title:    "Tasamos tu propiedad",
    subtitle: "Sin costo, sin compromiso.",
    headline: "Conocé el valor real\nde tu propiedad en Tandil.",
    body:     "Nuestro equipo analiza tu propiedad con datos reales del mercado tandilense y más de 14 años de operaciones en la zona.",
    image:    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80",
    benefits: [
      { icon: "clock",   text: "Respuesta en 24 horas" },
      { icon: "shield",  text: "Tasadores matriculados" },
      { icon: "chart",   text: "Datos del mercado local" },
      { icon: "check",   text: "Sin costo ni compromiso" },
    ],
    formTitle: "Solicitá tu tasación gratuita",
  },

  // ─── PROCESO DE VENTA ─────────────────────────────────────────
  proceso: {
    title:    "Proceso de venta",
    subtitle: "Así trabajamos con vos.",
    headline: "Tu venta, paso a paso,\nsin sorpresas.",
    body:     "Acompañamos cada etapa con transparencia y dedicación. Desde la tasación hasta la escritura, siempre a tu lado.",
    steps: [
      {
        number: "01",
        title:  "Tasación gratuita",
        body:   "Analizamos tu propiedad con datos reales del mercado local para definir el precio óptimo.",
        icon:   "search",
      },
      {
        number: "02",
        title:  "Publicación premium",
        body:   "Fotografía profesional y publicación en todos los portales inmobiliarios más importantes.",
        icon:   "camera",
      },
      {
        number: "03",
        title:  "Calificación de interesados",
        body:   "Filtramos a cada interesado para que solo recibas visitas de compradores serios.",
        icon:   "users",
      },
      {
        number: "04",
        title:  "Negociación estratégica",
        body:   "Negociamos en tu nombre con criterio y experiencia para lograr las mejores condiciones.",
        icon:   "handshake",
      },
      {
        number: "05",
        title:  "Documentación y cierre",
        body:   "Gestionamos toda la documentación legal y te acompañamos hasta la escritura.",
        icon:   "document",
      },
      {
        number: "06",
        title:  "Post-venta",
        body:   "Seguimos disponibles después del cierre para cualquier consulta o gestión adicional.",
        icon:   "star",
      },
    ],
  },

  // ─── SOBRE NOSOTROS ───────────────────────────────────────────
  about: {
    title:    "Sobre nosotros",
    subtitle: "Quiénes somos.",
    headline: "14 años haciendo\ndel mercado inmobiliario\nalgo simple en Tandil.",
    body:     "Zubiaurre Propiedades nació con una convicción: comprar o vender una propiedad en Tandil debe ser un proceso claro, humano y sin sorpresas. Hoy somos referentes en la ciudad, con más de 600 operaciones concretadas y cientos de familias que confiaron en nosotros.",
    image:    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80",
    values: [
      { title: "Transparencia",  body: "Información honesta y comunicación clara en cada paso del proceso." },
      { title: "Conocimiento local", body: "14 años operando en Tandil nos dan una perspectiva única del mercado." },
      { title: "Dedicación",     body: "Cada cliente recibe atención personalizada de principio a fin." },
    ],
    team: [
      {
        name:  "Laura Zubiaurre",
        role:  "Directora Comercial",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
        linkedin: null,
      },
      {
        name:  "Sebastián Mora",
        role:  "Tasador Matriculado",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
        linkedin: null,
      },
      {
        name:  "Florencia Ibáñez",
        role:  "Asesora Senior",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
        linkedin: null,
      },
    ],
  },

  // ─── CONTACTO ─────────────────────────────────────────────────
  contact: {
    phone:     "+54 249 467-1791",
    whatsapp:  "549249467179１",
    email:     "info@zubiaurrepropiedades.com.ar",
    address:   "Tandil, Buenos Aires",
    hours:     "Lun–Vie 9:00–18:00 / Sáb 10:00–14:00",
    instagram: "https://instagram.com/zubiaurrepropiedades",
    instagramHandle: "@zubiaurrepropiedades",
    facebook:  null,
    maps:      "https://goo.gl/maps/example",
    whatsappMessage: "Hola! Me contacto desde su sitio web. Quisiera obtener más información.",
  },

  // ─── FOOTER ───────────────────────────────────────────────────
  footer: {
    tagline:   "Tu lugar en Tandil, con quienes conocen cada rincón.",
    copyright: `© ${new Date().getFullYear()} Zubiaurre Propiedades. Todos los derechos reservados.`,
  },

  // ─── STATS / COUNT-UP ─────────────────────────────────────────
  stats: [
    { value: 600,  suffix: "+", label: "Propiedades vendidas",   icon: "home"  },
    { value: 14,   suffix: "",  label: "Años en el mercado",     icon: "clock" },
    { value: 97,   suffix: "%", label: "Clientes satisfechos",   icon: "star"  },
    { value: 950,  suffix: "+", label: "Familias asesoradas",    icon: "users" },
  ],

  // ─── TESTIMONIOS ──────────────────────────────────────────────
  testimonials: [
    {
      name: "Cecilia Romero",
      role: "Compró en el Centro",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&q=80",
      rating: 5,
      text: "Excelente atención desde el primer momento. Entendieron lo que buscaba y en poco tiempo encontré el departamento ideal. Muy recomendables.",
    },
    {
      name: "Pablo Giménez",
      role: "Vendió en las Sierras",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80",
      rating: 5,
      text: "La tasación fue muy precisa y cerramos la venta en menos de dos meses al precio esperado. Profesionalismo total.",
    },
    {
      name: "Natalia Pereyra",
      role: "Alquiló en Tandil",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80",
      rating: 5,
      text: "El trámite fue rápido y sin complicaciones. Siempre disponibles para responder mis dudas. Un equipo muy humano.",
    },
    {
      name: "Gonzalo Herrera",
      role: "Compró chalet en las Sierras",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
      rating: 5,
      text: "Llevaba tiempo buscando algo en las sierras y Zubiaurre me mostró opciones que no encontré en ningún otro lado. Conocen Tandil como nadie.",
    },
    {
      name: "Marcela Vidal",
      role: "Vendió en Movediza",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
      rating: 5,
      text: "Recibí ofertas en la primera semana. La estrategia de difusión fue muy efectiva. Resultado inmejorable.",
    },
  ],

  // ─── TOKKO BROKER ─────────────────────────────────────────────
  tokko: {
    enabled:    false,
    apiKey:     "",
    apiBaseUrl: "/api",
  },

};

export default config;