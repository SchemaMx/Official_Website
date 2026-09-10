import { useLanguage } from '@/i18n/LanguageContext'
import { NodeGraphCanvas } from '@/components/NodeGraphCanvas'
import { CalendlyButton } from '@/components/CalendlyButton'
import type { Page } from '@/App'

export function Home({ setPage }: { setPage: (p: Page) => void }) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden line-grid">
        <NodeGraphCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8 animate-fade-in">
              <span className="font-mono text-[10px] tracking-[0.2em] text-teal uppercase">{t.hero.eyebrow}</span>
              <span className="w-8 h-px bg-teal/40" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">{t.hero.kicker}</span>
            </div>

            <h1 className="text-[clamp(2.8rem,7vw,6rem)] font-light leading-[1.05] tracking-[-0.01em] mb-6">
              <span className="text-white animate-fade-up block" style={{ animationDelay: '0.05s', opacity: 0 }}>
                {t.hero.title1}
              </span>
              <span
                className="font-serif italic text-gradient-brand animate-fade-up block"
                style={{ animationDelay: '0.15s', opacity: 0 }}
              >
                {t.hero.title2}
              </span>
            </h1>

            <p
              className="text-white/50 text-lg font-light leading-relaxed max-w-xl mb-12 animate-fade-up"
              style={{ animationDelay: '0.3s', opacity: 0 }}
            >
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: '0.45s', opacity: 0 }}>
              <CalendlyButton className="group flex items-center gap-3 px-7 py-3.5 bg-teal text-ink font-mono text-[12px] tracking-[0.1em] uppercase hover:bg-teal/80 transition-colors duration-200">
                {t.hero.ctaPrimary}
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </CalendlyButton>
              <button
                onClick={() => setPage('scope')}
                className="flex items-center gap-3 px-7 py-3.5 border border-white/15 text-white/60 font-mono text-[12px] tracking-[0.1em] uppercase hover:border-white/30 hover:text-white/80 transition-all duration-200"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 hidden lg:block">
          <div className="font-mono text-[9px] tracking-[0.2em] text-white/20 uppercase text-right leading-loose">
            <div>{t.hero.cornerLabel1}</div>
            <div>{t.hero.cornerLabel2}</div>
            <div>{t.hero.cornerLabel3}</div>
          </div>
        </div>
      </section>

      {/* Did you know? */}
      <section className="border-y border-white/7 bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="font-mono text-[10px] tracking-[0.2em] text-purple uppercase mb-6">
              {t.sabiasQue.eyebrow}
            </div>
            <p className="text-[clamp(1.5rem,3.5vw,2.4rem)] font-light leading-snug text-white/90">
              <span className="text-gradient-brand font-serif italic">{t.sabiasQue.statHighlight}</span>{' '}
              {t.sabiasQue.statRest}
            </p>
            <p className="mt-6 text-white/50 text-lg">{t.sabiasQue.closing}</p>
          </div>
        </div>
      </section>

      {/* Capabilities teaser */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-28">
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-light text-white leading-tight flex-1">
            {t.about.title1}
            <br />
            <span className="font-serif italic text-purple">{t.about.title2}</span>
          </h2>
          <button
            onClick={() => setPage('scope')}
            className="font-mono text-[11px] tracking-[0.15em] text-teal uppercase hover:text-white transition-colors duration-200 flex items-center gap-2 group"
          >
            {t.about.cta} <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/7">
          {t.scope.groups.map((g, i) => (
            <div
              key={g.label}
              className="bg-ink p-8 md:p-10 group hover:bg-card transition-colors duration-300 cursor-default"
            >
              <div className="font-mono text-[10px] tracking-[0.2em] text-teal/50 mb-6">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-xl font-medium text-white mb-3 group-hover:text-teal transition-colors duration-300">
                {g.label}
              </h3>
              <p className="text-white/40 text-[14px] leading-relaxed mb-8">{g.description}</p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item.name}
                    className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/30 border border-white/10 px-2 py-1"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden bg-card border-t border-white/7">
        <div className="absolute inset-0 dot-grid opacity-60" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-teal uppercase mb-3">{t.contact.scheduleTitle}</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-light text-white leading-tight">
              {t.ctaBand.line1}
              <br />
              <span className="font-serif italic text-white/50">{t.ctaBand.line2}</span>
            </h2>
          </div>
          <CalendlyButton className="shrink-0 px-8 py-4 bg-transparent border border-teal/50 text-teal font-mono text-[12px] tracking-[0.1em] uppercase hover:bg-teal hover:text-ink transition-all duration-300">
            {t.contact.scheduleCta}
          </CalendlyButton>
        </div>
      </section>
    </div>
  )
}
