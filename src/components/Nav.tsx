import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { LanguageToggle } from './LanguageToggle'
import { CalendlyButton } from './CalendlyButton'
import logoIcon from '@/assets/logo-icon.png'

const NAV_LINKS = [
  { path: '/', key: 'home' as const },
  { path: '/scope', key: 'scope' as const },
  { path: '/team', key: 'team' as const },
  { path: '/projects', key: 'projects' as const },
  { path: '/contact', key: 'contact' as const },
]

export function Nav() {
  const { t } = useLanguage()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path))

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-blur border-b ${
        scrolled ? 'border-white/8 bg-ink/90' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Schema — Home">
          <img src={logoIcon} alt="" className="h-9 md:h-10 w-auto" />
          <span className="font-display text-2xl md:text-[28px] tracking-wide text-foreground leading-none pt-0.5">
            SCHEMA
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ path, key }) => (
            <Link
              key={path}
              to={path}
              className={`relative px-4 py-2 font-mono text-[11px] tracking-[0.1em] uppercase transition-colors duration-200 ${
                isActive(path) ? 'text-teal' : 'text-white/40 hover:text-white/80'
              }`}
            >
              {isActive(path) && <span className="absolute bottom-1 left-4 right-4 h-px bg-teal" />}
              {t.nav[key]}
            </Link>
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
          {NAV_LINKS.map(({ path, key }) => (
            <Link
              key={path}
              to={path}
              className={`block w-full text-left px-8 py-3 font-mono text-[12px] tracking-[0.1em] uppercase ${
                isActive(path) ? 'text-teal' : 'text-white/50'
              }`}
            >
              {t.nav[key]}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
