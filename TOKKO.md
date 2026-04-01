# 🔌 Integración con Tokko Broker

Guía completa para conectar el template a la cuenta de Tokko de tu cliente.

---

## ¿Cómo funciona?

```
Tokko Broker          Proxy Node.js           Frontend React
(propiedades)   →     (server.js)       →     (el sitio)
                       traduce CORS
                       normaliza datos
                       cachea 5 min
```

El frontend **nunca habla directamente con Tokko** (CORS bloqueado).
Siempre pasa por el proxy que vos deployás.

---

## Setup en 5 pasos

### 1. Conseguir la API Key de Tokko

El cliente debe dártela. La encuentra en:
`tokkobroker.com → Mi cuenta → Configuración → API Key`

### 2. Crear el archivo `.env`

```bash
# En la raíz del proyecto, copiá el ejemplo:
cp .env.example .env

# Editá .env y pegá la key:
TOKKO_API_KEY=abc123xyz...
```

⚠️ **El `.env` NUNCA va al repositorio.** Está en `.gitignore`.

### 3. Activar Tokko en `config.js`

```js
tokko: {
  enabled:    true,   // ← cambiar de false a true
  apiBaseUrl: "/api", // en dev funciona automático
}
```

### 4. Correr todo junto (dev)

```bash
npm install
npm run dev:full
# Levanta Vite en :3000 y el proxy en :3001 simultáneamente
```

Verificá que el proxy funciona:
```
http://localhost:3001/health
http://localhost:3001/api/properties
```

### 5. Probar en el navegador

```
http://localhost:3000
```

Las propiedades ahora vienen de Tokko en tiempo real.

---

## Deploy en producción

### Opción A — Railway (recomendado, gratis)

1. Crear cuenta en [railway.app](https://railway.app)
2. Nuevo proyecto → Deploy from GitHub
3. En Variables de entorno: `TOKKO_API_KEY=la_key`
4. Start command: `node server.js`
5. Railway te da una URL tipo: `https://mi-proxy.up.railway.app`

Luego en `config.js`:
```js
tokko: {
  enabled:    true,
  apiBaseUrl: "https://mi-proxy.up.railway.app/api",
}
```

El frontend (el sitio) lo deployás por separado en Vercel o Netlify.

### Opción B — Render

1. Crear cuenta en [render.com](https://render.com)
2. New → Web Service → conectar repo
3. Build command: `npm install`
4. Start command: `node server.js`
5. Environment: `TOKKO_API_KEY=la_key`

### Opción C — Todo en Vercel (serverless)

Si querés un solo deploy, podés convertir `server.js` en funciones
de Vercel. Crear `api/properties.js`:

```js
// api/properties.js
export default async function handler(req, res) {
  const TOKKO_API_KEY = process.env.TOKKO_API_KEY;
  // ... misma lógica del server.js
}
```

---

## Por cliente: flujo completo

```
Cliente 1: Inmobiliaria A
├── Carpeta: /clientes/inmobiliaria-a/
├── src/config.js → tokko.enabled: true
├── .env → TOKKO_API_KEY=key_de_cliente_a
└── Proxy deployado en: railway-cliente-a.up.railway.app

Cliente 2: Inmobiliaria B
├── Carpeta: /clientes/inmobiliaria-b/
├── src/config.js → tokko.enabled: true
├── .env → TOKKO_API_KEY=key_de_cliente_b
└── Proxy deployado en: railway-cliente-b.up.railway.app
```

Cada cliente tiene su propio proxy con su propia API key.
El frontend de cada cliente apunta a su propio proxy.

---

## Mapeo de datos Tokko → Template

| Tokko              | Template interno  |
|--------------------|-------------------|
| `operation_type=1` | `operation: "venta"` |
| `operation_type=2` | `operation: "alquiler"` |
| `type.id=1`        | `type: "departamento"` |
| `type.id=2`        | `type: "casa"` |
| `is_starred_on_web`| `featured: true` |
| `roofed_surface`   | `surfaceCovered` |
| `total_surface`    | `surfaceTotal` |
| `room_amount`      | `rooms` |
| `bedroom_amount`   | `bedrooms` |
| `bathroom_amount`  | `bathrooms` |
| `parking_lot_amount`| `garage` |

El normalizador completo está en `src/utils/tokkoNormalizer.js`.

---

## Filtros disponibles en el listado

| Filtro    | Enviado al proxy como     |
|-----------|--------------------------|
| Venta     | `operation_type=1`       |
| Alquiler  | `operation_type=2`       |
| Depto     | `property_type=1,13`     |
| Casa      | `property_type=2,14`     |
| Oficina   | `property_type=5`        |
| Local     | `property_type=4`        |
| Terreno   | `property_type=7`        |
| Búsqueda  | `search=texto`           |
| Orden     | `order_by=price_from_usd`|

---

## Modo mock (sin Tokko)

Cuando `tokko.enabled: false`, el sitio muestra las propiedades
de `src/utils/mockData.js`. Útil para:
- Hacer demos rápidas sin API key
- Trabajar offline
- Testear el diseño

Las propiedades del mock tienen el mismo formato interno,
así que el switch es transparente para el frontend.
