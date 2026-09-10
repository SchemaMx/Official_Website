import { useLanguage } from '@/i18n/LanguageContext'
import type { Page } from '@/App'

const PAGE_ORDER: Page[] = ['home', 'scope', 'team', 'projects', 'contact']

export function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const { t } = useLanguage()

  const navLabel: Record<Page, string> = {
    home: t.nav.home,
    scope: t.nav.scope,
    team: t.nav.team,
    projects: t.nav.projects,
    contact: t.nav.contact,
  }

  return (
    <footer className="border-t border-white/7 bg-ink">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="font-mono text-[10px] tracking-[0.2em] text-white/20 uppercase">
          © {new Date().getFullYear()} Schema — {t.footer.rights}
        </div>
        <div className="flex gap-6 flex-wrap">
          {PAGE_ORDER.map((id) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/25 hover:text-white/60 transition-colors duration-200"
            >
              {navLabel[id]}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}
