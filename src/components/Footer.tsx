import { Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'

const NAV_LINKS = [
  { path: '/', key: 'home' as const },
  { path: '/scope', key: 'scope' as const },
  { path: '/team', key: 'team' as const },
  { path: '/projects', key: 'projects' as const },
  { path: '/contact', key: 'contact' as const },
]

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-white/7 bg-ink">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="font-mono text-[10px] tracking-[0.2em] text-white/20 uppercase">
          © {new Date().getFullYear()} Schema — {t.footer.rights}
        </div>
        <div className="flex gap-6 flex-wrap">
          {NAV_LINKS.map(({ path, key }) => (
            <Link
              key={path}
              to={path}
              className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 hover:text-white/60 transition-colors duration-200"
            >
              {t.nav[key]}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
