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
import { Contact } from '@/pages/Contact'

function DocumentMeta() {
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t.meta.title
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', t.meta.description)
  }, [t])

  return null
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

function AppShell() {
  return (
    <div className="min-h-screen bg-ink text-white font-sans">
      <DocumentMeta />
      <ScrollToTop />
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

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </LanguageProvider>
  )
}
