import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Home } from '@/pages/Home'
import { Scope } from '@/pages/Scope'
import { Team } from '@/pages/Team'
import { Projects } from '@/pages/Projects'
import { ProjectDetail } from '@/pages/ProjectDetail'
import { OmegaLanding } from '@/pages/OmegaLanding'
import { OmegaDemo } from '@/pages/OmegaDemo'
import { Contact } from '@/pages/Contact'

// Omega pages carry their own product identity, so a link shared with a doctor
// previews as Omega rather than as the Schema consultancy site.
const OMEGA_META = {
  title: 'Omega | Software para clínicas de bariatría y metabolismo',
  description:
    'Omega Gestionador de Clínica Inteligente: expediente completo, lectura automática de laboratorios e InBody, y automatización por WhatsApp para clínicas en México.',
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function DocumentMeta() {
  const { t } = useLanguage()
  const { pathname } = useLocation()
  const isOmega = pathname.startsWith('/omega')

  useEffect(() => {
    const { title, description } = isOmega ? OMEGA_META : { title: t.meta.title, description: t.meta.description }
    document.title = title
    setMeta('description', description)
    // Omega's pages are light; without this the dark Schema page background
    // shows through on overscroll and in the mobile browser chrome.
    const pageBg = isOmega ? '#ffffff' : '#1d1d1b'
    document.documentElement.style.backgroundColor = pageBg
    setMeta('theme-color', pageBg)
  }, [t, isOmega])

  return null
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

// Omega is its own product with its own light-themed identity — it renders
// standalone, without Schema's dark site chrome (whose light-on-dark nav
// text would otherwise go nearly invisible against Omega's white pages).
function StandaloneRoutes() {
  return (
    <Routes>
      <Route path="/omega" element={<OmegaLanding />} />
      <Route path="/omega/demo" element={<OmegaDemo />} />
    </Routes>
  )
}

function ChromedRoutes() {
  return (
    <div className="min-h-screen bg-ink text-white font-sans">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scope" element={<Scope />} />
          <Route path="/team" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function AppShell() {
  const { pathname } = useLocation()
  const isStandalone = pathname.startsWith('/omega')

  return (
    <>
      <DocumentMeta />
      <ScrollToTop />
      {isStandalone ? <StandaloneRoutes /> : <ChromedRoutes />}
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </LanguageProvider>
  )
}
