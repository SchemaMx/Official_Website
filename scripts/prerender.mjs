// GitHub Pages has no SPA rewrite, and crawlers/AI fetchers generally don't run
// JavaScript. Both problems have the same fix: emit a real, fully-rendered
// index.html per route.
//
//  - Pages then answers 200 instead of falling through to 404.html
//  - Crawlers read the actual copy instead of an empty <div id="root">
//
// The client hydrates this markup (see src/main.tsx). 404.html stays as the
// catch-all for unlisted paths, which React Router redirects home.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const DIST = 'dist'
const ORIGIN = 'https://schema.mx'
const TODAY = new Date().toISOString().slice(0, 10)

const { render } = await import(pathToFileURL(join(process.cwd(), 'dist-ssr/entry-server.js')).href)

const SCHEMA = {
  title: 'Schema | Data & AI',
  description:
    'En Schema, empoderamos a las PyMEs con soluciones de Data & AI. Ofrecemos dashboards, diagnósticos de negocio, pronósticos y más para impulsar tu crecimiento.',
  image: '/favicon.png',
}

const OMEGA = {
  title: 'Omega | Software para clínicas de bariatría y metabolismo',
  description:
    'Omega Gestionador de Clínica Inteligente: expediente completo, lectura automática de laboratorios e InBody, calculadoras de riesgo clínico y automatización por WhatsApp para clínicas en México.',
  image: '/omega-social.png',
}

const ORGANIZATION = {
  '@type': 'Organization',
  name: 'Schema',
  url: ORIGIN,
  description: 'Consultoría de Data & AI para PyMEs en México.',
}

// Describes the product in a form search engines and AI assistants parse directly.
const OMEGA_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Omega Gestionador de Clínica Inteligente',
  alternateName: 'Omega Intelligent Clinic Management',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  url: `${ORIGIN}/omega`,
  inLanguage: ['es-MX', 'en'],
  description: OMEGA.description,
  publisher: ORGANIZATION,
  audience: {
    '@type': 'Audience',
    audienceType: 'Médicos bariatras, especialistas en metabolismo y clínicas de obesidad en México',
  },
  featureList: [
    'Expediente clínico completo del paciente',
    'Lectura automática de estudios de laboratorio e InBody',
    'Resumen clínico del paciente generado con IA',
    'Calculadoras de riesgo: Framingham, FINDRISC, HOMA-IR, TyG, VAI, FLI, NAFLD',
    'Estadificación EOSS sugerida automáticamente',
    'Tamizaje de sarcopenia (SARC-F)',
    'Seguimiento de tratamiento GLP-1 y metas de peso',
    'Medidas de circunferencias con diagrama corporal',
    'Calendario integrado con sincronización a Google Calendar',
    'Confirmaciones y recordatorios de cita automáticos por WhatsApp',
    'Reconocimiento de voz con IA para notas de consulta',
    'Soporte multi-doctor y formularios personalizables por clínica',
  ],
  offers: [
    ['Base', '800', 'Lo esencial para dejar de usar papel y hojas de cálculo.'],
    ['Essentials', '1000', 'Formularios y métricas personalizadas, más conexión con calendarios.'],
    ['Automation', '1500', 'Automatización por WhatsApp y reconocimiento de voz con IA.'],
    ['Custom', '2500', 'Herramientas personalizadas a la medida de la clínica.'],
  ].map(([name, price, description]) => ({
    '@type': 'Offer',
    name,
    description,
    price,
    priceCurrency: 'MXN',
    category: 'Suscripción mensual',
    url: `${ORIGIN}/omega#precios`,
  })),
}

const SCHEMA_JSONLD = { '@context': 'https://schema.org', ...ORGANIZATION }

// '' is the root (dist/index.html); every other entry becomes dist/<path>/index.html
const ROUTES = [
  { path: '', meta: SCHEMA, jsonld: SCHEMA_JSONLD, priority: '1.0' },
  { path: 'scope', meta: SCHEMA, jsonld: SCHEMA_JSONLD, priority: '0.8' },
  { path: 'team', meta: SCHEMA, jsonld: SCHEMA_JSONLD, priority: '0.7' },
  { path: 'projects', meta: SCHEMA, jsonld: SCHEMA_JSONLD, priority: '0.8' },
  // Redirects to /omega, so it points search engines there instead of ranking
  // as a thin duplicate. Prerendered only so the URL answers 200, not 404.
  { path: 'projects/omega', meta: OMEGA, jsonld: OMEGA_JSONLD, canonical: 'omega', sitemap: false },
  { path: 'projects/pricing-consultoras', meta: SCHEMA, jsonld: SCHEMA_JSONLD, priority: '0.5' },
  { path: 'contact', meta: SCHEMA, jsonld: SCHEMA_JSONLD, priority: '0.7' },
  { path: 'omega', meta: OMEGA, jsonld: OMEGA_JSONLD, priority: '1.0' },
  { path: 'omega/demo', meta: OMEGA, jsonld: OMEGA_JSONLD, priority: '0.6' },
]

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function buildHtml(shell, { path, meta, jsonld, canonical }, body) {
  const url = `${ORIGIN}/${path}`
  const canonicalUrl = `${ORIGIN}/${canonical ?? path}`
  const head = [
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Schema" />`,
    `<meta property="og:locale" content="es_MX" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(ORIGIN + meta.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(ORIGIN + meta.image)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<link rel="canonical" href="${esc(canonicalUrl)}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>`,
  ].join('\n    ')

  return shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${esc(meta.description)}" />`
    )
    .replace('</head>', `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}

const shell = readFileSync(join(DIST, 'index.html'), 'utf8')

for (const route of ROUTES) {
  const body = render('/' + route.path)
  const html = buildHtml(shell, route, body)
  const dir = route.path ? join(DIST, route.path) : DIST
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

// Unlisted paths still 404 from Pages; React Router sends them home.
writeFileSync(
  join(DIST, '404.html'),
  buildHtml(shell, { path: '', meta: SCHEMA, jsonld: SCHEMA_JSONLD }, '')
)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.filter((r) => r.sitemap !== false).map(
  (r) => `  <url>
    <loc>${ORIGIN}/${r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <priority>${r.priority}</priority>
  </url>`
).join('\n')}
</urlset>
`
writeFileSync(join(DIST, 'sitemap.xml'), sitemap)

console.log(`prerendered ${ROUTES.length} routes + 404.html + sitemap.xml`)
