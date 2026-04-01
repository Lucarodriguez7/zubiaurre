# 🏡 Inmobiliaria Premium — Template v2

Template React completo, multipage y 100% personalizable desde un solo archivo.

---

## 🚀 Inicio rápido

```bash
npm install
npm run dev      # → http://localhost:3000
npm run build    # → carpeta /dist lista para deploy
```

---

## 📁 Estructura

```
src/
├── config.js          ← ✏️  ÚNICO archivo a modificar por cliente
├── App.jsx            ← Rutas + inyección de tema
├── index.css          ← Variables CSS globales
├── components/
│   ├── Navbar         ← Nav transparente + solid al scroll + drawer mobile
│   ├── Footer
│   ├── PropertyCard   ← Card reutilizable
│   └── WhatsAppFloat  ← Botón flotante con panel de contacto
├── pages/
│   ├── Home           ← Hero, servicios, props destacadas, tasación, proceso, nosotros
│   ├── Properties     ← Listado con filtros, búsqueda, vista grilla/lista
│   ├── PropertyDetail ← Detalle estilo ZonaProp premium + lightbox
│   ├── Tasacion       ← Formulario → WhatsApp
│   ├── Proceso        ← Steps, why us, FAQ
│   ├── About          ← Historia, valores, equipo
│   └── Contact        ← Formulario + info de contacto
└── utils/
    └── mockData.js    ← 9 propiedades demo con datos completos
```

---

## 🎨 Personalización por cliente — solo `config.js`

### 1. Cambiar marca
```js
brand: {
  name:      "López Propiedades",
  slogan:    "Tu hogar, nuestra misión.",
  logoText:  "LÓPEZ",
  logoImage: "/logo.png",   // o null para usar texto
}
```

### 2. Cambiar colores (re-branding completo)
```js
colors: {
  primary: "#1B2A4A",   // Azul marino
  accent:  "#E8A838",   // Ámbar dorado
  // ...el resto se adapta automáticamente
}
```

**Paletas sugeridas:**

| Estilo | primary | accent |
|--------|---------|--------|
| Dorado clásico   | `#0B0B0B` | `#BFA27A` |
| Azul náutico     | `#0D2137` | `#4CA6D4` |
| Verde premium    | `#1C2B1A` | `#7FB069` |
| Terracota cálido | `#2B1A0A` | `#C07040` |
| Gris minimal     | `#1A1A1A` | `#A0A0A0` |

### 3. Cambiar tipografía
```js
fonts: {
  heading: "'Playfair Display', Georgia, serif",
  body:    "'Inter', system-ui, sans-serif",
  googleFontsUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&family=Inter:wght@300;400;500&display=swap",
}
```

### 4. Cambiar hero
```js
hero: {
  headline:    "Tu nuevo hogar\nte está esperando.",
  subheadline: "...",
  image:       "https://url-de-imagen.com/hero.jpg",
  stats: [
    { value: "500+", label: "Propiedades vendidas" },
    ...
  ]
}
```

### 5. Configurar WhatsApp
```js
contact: {
  whatsapp: "5492236000000",  // sin + ni espacios: 54 + 9 + código + número
  whatsappMessage: "Hola! Me contacto desde su sitio.",
}
```

### 6. Agregar propiedades reales
Editá `src/utils/mockData.js` y reemplazá con tus propiedades.
Cada propiedad tiene:
- `slug` → URL amigable (`/propiedades/mi-depto-centro`)
- `photos` → array de URLs de imágenes
- `agent` → asesor asignado con foto y teléfono
- Todos los datos de superficie, ambientes, precio, etc.

### 7. Integrar Tokko Broker
```js
tokko: {
  enabled:    true,
  apiKey:     "TU_API_KEY",
  apiBaseUrl: "/api",
}
```
Configurar el proxy Node (`server.js`) separado.

---

## 🌐 Deploy

### Vercel
```bash
npm i -g vercel
vercel
# Build: npm run build | Output: dist
```

### Netlify
```bash
npm run build
# Subir /dist o conectar repo Git
```

---

## ⚡ Flujo para nuevo cliente (10 minutos)

1. Clonar repo
2. Abrir `src/config.js`
3. Cambiar: `brand`, `colors`, `hero`, `contact.whatsapp`
4. Reemplazar propiedades en `mockData.js`
5. `npm run build` → deploy

---

## 📄 Páginas incluidas

| Ruta | Página |
|------|--------|
| `/` | Home completo con hero, servicios, props, tasación preview, proceso preview, nosotros preview |
| `/propiedades` | Listado con filtros por operación/tipo, búsqueda, grilla/lista |
| `/propiedades/:slug` | Detalle con galería, lightbox, stats, descripción, agente, share |
| `/tasacion` | Formulario de tasación → WhatsApp |
| `/proceso` | Pasos del proceso, por qué elegirnos, FAQ |
| `/nosotros` | Historia, valores, equipo |
| `/contacto` | Formulario + info de contacto |
