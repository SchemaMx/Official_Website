import { Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { CalendlyButton } from '@/components/CalendlyButton'

export function Projects() {
  const { t } = useLanguage()

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/7 mt-12">
          {t.projects.flagship.map((p) => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              className="bg-card p-8 md:p-10 flex flex-col group hover:bg-[#111110] transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-8 gap-3">
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-1 border border-teal/30 text-teal/80 shrink-0">
                  {p.statusLabel}
                </span>
                <span className="font-mono text-[9px] tracking-[0.15em] text-white/25 uppercase group-hover:text-teal transition-colors duration-300 shrink-0">
                  →
                </span>
              </div>

              <h3 className="text-white text-2xl font-light mb-2 group-hover:text-teal transition-colors duration-300">
                {p.name}
              </h3>
              <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-white/25 mb-5">{p.nameNote}</div>

              <p className="text-white/50 text-[14px] leading-relaxed mb-8">{p.tagline}</p>

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
            </Link>
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
