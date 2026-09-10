import { useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { CalendlyButton } from '@/components/CalendlyButton'

export function Projects() {
  const { t } = useLanguage()
  // Index into t.projects.filters, or null for "all" — index-based so the
  // selection survives a language switch (the label strings themselves change).
  const [filterIndex, setFilterIndex] = useState<number | null>(null)
  const activeCategory = filterIndex === null ? null : t.projects.filters[filterIndex]
  const visible = activeCategory === null ? t.projects.samples : t.projects.samples.filter((p) => p.category === activeCategory)

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="pt-12 pb-20 border-b border-white/7">
          <div className="font-mono text-[10px] tracking-[0.2em] text-teal uppercase mb-6">{t.projects.eyebrow}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1.05] text-white">
              {t.projects.title1}
              <br />
              <span className="font-serif italic text-purple">{t.projects.title2}</span>
            </h1>
            <p className="text-white/40 text-base leading-relaxed">{t.projects.intro}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap mt-10 mb-2">
          <button
            onClick={() => setFilterIndex(null)}
            className={`font-mono text-[10px] tracking-[0.12em] uppercase px-4 py-2 border transition-all duration-200 ${
              filterIndex === null
                ? 'border-teal/60 text-teal bg-teal/8'
                : 'border-white/10 text-white/35 hover:text-white/60 hover:border-white/25'
            }`}
          >
            {t.projects.filterAll}
          </button>
          {t.projects.filters.map((f, i) => (
            <button
              key={f}
              onClick={() => setFilterIndex(i)}
              className={`font-mono text-[10px] tracking-[0.12em] uppercase px-4 py-2 border transition-all duration-200 ${
                filterIndex === i
                  ? 'border-teal/60 text-teal bg-teal/8'
                  : 'border-white/10 text-white/35 hover:text-white/60 hover:border-white/25'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/7 mt-10">
          {visible.map((p, i) => (
            <div key={i} className="bg-card p-8 md:p-10 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-purple/60">
                  {p.category}
                </span>
                <span className="font-mono text-[8px] tracking-[0.12em] uppercase px-2 py-1 border border-teal/30 text-teal/70 shrink-0 ml-3">
                  {t.projects.sampleBadge}
                </span>
              </div>

              <h3 className="text-white/90 text-lg font-medium mb-1">{p.title}</h3>
              <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/30 mb-5">{p.client}</div>

              <p className="text-white/45 text-[13px] leading-relaxed mb-6 pl-3 border-l border-teal/30">
                {p.outcome}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[8px] tracking-[0.1em] uppercase px-2 py-1 border border-white/8 text-white/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 border border-teal/20 bg-teal/5 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="text-white text-xl font-light mb-2">{t.projects.ctaTitle}</div>
            <p className="text-white/45 text-[14px] max-w-md">{t.projects.ctaBody}</p>
          </div>
          <CalendlyButton className="shrink-0 px-8 py-4 bg-teal text-ink font-mono text-[12px] tracking-[0.1em] uppercase hover:bg-teal/80 transition-colors duration-200">
            {t.contact.scheduleCta}
          </CalendlyButton>
        </div>
      </div>
    </div>
  )
}
