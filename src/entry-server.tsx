// Build-time rendering entry. Used by scripts/prerender.mjs to turn each route
// into real HTML so crawlers and AI fetchers (which generally don't run JS)
// get the page's actual content instead of an empty <div id="root">.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { LanguageProvider } from '@/i18n/LanguageContext'
import { AppShell } from './App'

export function render(url: string): string {
  return renderToString(
    <LanguageProvider>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </LanguageProvider>,
  )
}
