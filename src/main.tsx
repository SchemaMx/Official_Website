import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const container = document.getElementById('root')!
const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Routes are prerendered at build time (scripts/prerender.mjs), so attach to the
// existing markup rather than throwing it away and re-rendering from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
