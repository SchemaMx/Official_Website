import { useEffect, useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { LanguageToggle } from './LanguageToggle'
import { CalendlyButton } from './CalendlyButton'
import type { Page } from '@/App'
import logoIcon from '@/assets/logo-icon.png'

const PAGE_ORDER: Page[] = ['home', 'scope', 'team', 'projects', 'contact']

export function Nav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLabel: Record<Page, string> = {
    home: t.nav.home,
    scope: t.nav.scope,
    team: t.nav.team,
    projects: t.nav.projects,
    contact: t.nav.contact,
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-blur border-b ${
        scrolled ? 'border-white/8 bg-ink/90' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <button onClick={() => setPage('home')} className="flex items-center gap-2.5 shrink-0" aria-label="Schema — Home">
          <img src={logoIcon} alt="" className="h-9 md:h-10 w-auto" />
          <span className="font-display text-2xl md:text-[28px] tracking-wide text-foreground leading-none pt-0.5">
            SCHEMA
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {PAGE_ORDER.map((id) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`relative px-4 py-2 font-mono text-[11px] tracking-[0.1em] uppercase transition-colors duration-200 ${
                page === id ? 'text-teal' : 'text-white/40 hover:text-white/80'
              }`}
            >
              {page === id && <span className="absolute bottom-1 left-4 right-4 h-px bg-teal" />}
              {navLabel[id]}
            </button>
          ))}
          <LanguageToggle className="ml-4" />
          <CalendlyButton className="ml-2 px-5 py-2 border border-teal/40 text-teal font-mono text-[11px] tracking-[0.1em] uppercase hover:bg-teal/10 hover:border-teal/70 transition-all duration-200">
            {t.nav.cta}
          </CalendlyButton>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <LanguageToggle />
          <button
            className="flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-white/70 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-px bg-white/70 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-white/70 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-ink/98 border-t border-white/8 py-4">
          {PAGE_ORDER.map((id) => (
            <button
              key={id}
              onClick={() => {
                setPage(id)
                setMenuOpen(false)
              }}
              className={`block w-full text-left px-8 py-3 font-mono text-[12px] tracking-[0.1em] uppercase ${
                page === id ? 'text-teal' : 'text-white/50'
              }`}
            >
              {navLabel[id]}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
