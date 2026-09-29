// GitHub Pages has no SPA rewrite: a request for /omega with no file at that
// path falls through to 404.html, which Pages serves with a real HTTP 404.
// Browsers render the body anyway, but link-preview fetchers, stricter mobile
// clients and search engines honour the status and refuse the page.
//
// So we emit a real index.html per route (Pages then answers 200) and bake the
// right title/description/OG tags into each one, since crawlers don't run the
// JS that sets them at runtime. 404.html stays as the catch-all for anything
// not listed here (e.g. a mistyped URL), which React Router redirects home.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
const ORIGIN = 'https://schema.mx'

const SCHEMA = {
  title: 'Schema | Data & AI',
  description:
    'En Schema, empoderamos a las PyMEs con soluciones de Data & AI. Ofrecemos dashboards, diagnósticos de negocio, pronósticos y más para impulsar tu crecimiento.',
  image: '/favicon.png',
}

const OMEGA = {
  title: 'Omega | Software para clínicas de bariatría y metabolismo',
  description:
    'Omega Gestionador de Clínica Inteligente: expediente completo, lectura automática de laboratorios e InBody, y automatización por WhatsApp para clínicas en México.',
  image: '/omega-social.png',
}

// '' is the root (dist/index.html); every other entry becomes dist/<path>/index.html
const ROUTES = [
  { path: '', meta: SCHEMA },
  { path: 'scope', meta: SCHEMA },
  { path: 'team', meta: SCHEMA },
  { path: 'projects', meta: SCHEMA },
  { path: 'projects/omega', meta: OMEGA },
  { path: 'projects/pricing-consultoras', meta: SCHEMA },
  { path: 'contact', meta: SCHEMA },
  { path: 'omega', meta: OMEGA },
  { path: 'omega/demo', meta: OMEGA },
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function buildHtml(shell, { path, meta }) {
  const url = `${ORIGIN}/${path}`
  const social = [
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Schema" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(ORIGIN + meta.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(ORIGIN + meta.image)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
  ].join('\n    ')

  return shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${esc(meta.description)}" />`
    )
    .replace('</head>', `  ${social}\n  </head>`)
}

const shell = readFileSync(join(DIST, 'index.html'), 'utf8')

for (const route of ROUTES) {
  const html = buildHtml(shell, route)
  const dir = route.path ? join(DIST, route.path) : DIST
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

// Catch-all for unlisted paths. Still a 404 from Pages, which is correct here.
writeFileSync(join(DIST, '404.html'), buildHtml(shell, { path: '', meta: SCHEMA }))

console.log(`prerendered ${ROUTES.length} routes + 404.html`)
