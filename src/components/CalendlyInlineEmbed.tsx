import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { openCalendly } from '@/components/CalendlyButton'

const CALENDLY_BASE_URL = 'https://calendly.com/hola-schema/30min'
// Calendly's inline-embed theme params take raw hex (no '#') and only cover
// background/text/primary — enough to keep it from looking like a plain white
// pop-in against our dark theme, though the widget is still Calendly's own UI.
const THEME_PARAMS = 'background_color=1d1d1b&text_color=f4f2ec&primary_color=82c9c1&hide_gdpr_banner=1'
const EMBED_URL = `${CALENDLY_BASE_URL}?${THEME_PARAMS}`

const WIDGET_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js'

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void
    }
  }
}

function loadCalendlyScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Calendly) {
      resolve()
      return
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SCRIPT_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('calendly script failed')))
      return
    }
    const script = document.createElement('script')
    script.src = WIDGET_SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('calendly script failed'))
    document.head.appendChild(script)
  })
}

export function CalendlyInlineEmbed() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [scriptFailed, setScriptFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    loadCalendlyScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.Calendly) return
        window.Calendly.initInlineWidget({ url: EMBED_URL, parentElement: containerRef.current })
      })
      .catch(() => {
        if (!cancelled) setScriptFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="font-mono text-[10px] tracking-[0.2em] text-teal uppercase">{t.contact.scheduleTitle}</div>
        <button
          onClick={openCalendly}
          className="font-mono text-[9px] tracking-[0.12em] text-white/35 uppercase hover:text-teal transition-colors duration-200 shrink-0"
        >
          {t.contact.openNewTab} ↗
        </button>
      </div>

      {scriptFailed ? (
        <div className="border border-white/10 bg-card p-10 text-center">
          <p className="text-white/50 text-[14px] mb-5">{t.contact.embedFailed}</p>
          <button
            onClick={openCalendly}
            className="px-6 py-3 bg-teal text-ink font-mono text-[12px] tracking-[0.1em] uppercase hover:bg-teal/80 transition-colors duration-200"
          >
            {t.contact.scheduleCta}
          </button>
        </div>
      ) : (
        <div ref={containerRef} className="w-full h-[700px] border border-white/10" />
      )}
    </div>
  )
}
