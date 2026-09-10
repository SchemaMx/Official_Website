import { useEffect, useState } from 'react'
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Home } from '@/pages/Home'
import { Scope } from '@/pages/Scope'
import { Team } from '@/pages/Team'
import { Projects } from '@/pages/Projects'
import { Contact } from '@/pages/Contact'

export type Page = 'home' | 'scope' | 'team' | 'projects' | 'contact'

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

function AppShell() {
  const [page, setPage] = useState<Page>('home')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  return (
    <div className="min-h-screen bg-ink text-white font-sans">
      <DocumentMeta />
      <Nav page={page} setPage={setPage} />

      <main>
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'scope' && <Scope />}
        {page === 'team' && <Team />}
        {page === 'projects' && <Projects />}
        {page === 'contact' && <Contact />}
      </main>

      <Footer setPage={setPage} />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  )
}
