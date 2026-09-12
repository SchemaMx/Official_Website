import { Link, useParams } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { CalendlyButton } from '@/components/CalendlyButton'

export function ProjectDetail() {
  const { t } = useLanguage()
  const { slug } = useParams<{ slug: string }>()
  const project = t.projects.flagship.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="min-h-screen pt-24 pb-32 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center w-full">
          <h1 className="text-2xl font-light text-white mb-4">{t.projects.detail.notFoundTitle}</h1>
          <p className="text-white/40 mb-8">{t.projects.detail.notFoundBody}</p>
          <Link
            to="/projects"
            className="font-mono text-[11px] tracking-[0.15em] text-teal uppercase hover:text-white transition-colors duration-200"
          >
            {t.projects.detail.backToProjects}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <Link
          to="/projects"
          className="font-mono text-[10px] tracking-[0.15em] text-white/35 uppercase hover:text-teal transition-colors duration-200 inline-block mb-10"
        >
          {t.projects.detail.backToProjects}
        </Link>

        <div className="pb-12 border-b border-white/7">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-mono text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 border border-teal/30 text-teal/80">
              {project.statusLabel}
            </span>
            <span className="text-white/35 text-[13px]">{project.statusDetail}</span>
          </div>

          <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] font-light leading-[1.05] text-white mb-3">
            {project.name}
          </h1>
          <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/30 mb-6">
            {project.nameNote}
          </div>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl">{project.tagline}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/7 mt-12">
          <div className="bg-card p-8 md:p-10">
            <div className="font-mono text-[10px] tracking-[0.2em] text-purple uppercase mb-4">
              {t.projects.detail.problemTitle}
            </div>
            <p className="text-white/60 text-[15px] leading-relaxed">{project.problem}</p>
          </div>
          <div className="bg-card p-8 md:p-10">
            <div className="font-mono text-[10px] tracking-[0.2em] text-teal uppercase mb-4">
              {t.projects.detail.solutionTitle}
            </div>
            <p className="text-white/60 text-[15px] leading-relaxed">{project.solution}</p>
          </div>
        </div>

        <div className="mt-px">
          <div className="bg-card p-8 md:p-10 border-x border-b border-white/7">
            <div className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-6">
              {t.projects.detail.scopeTitle}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
              {project.scope.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-teal/60 mt-2 shrink-0" />
                  <span className="text-white/70 text-[14px] leading-snug">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-1 border border-white/10 text-white/35"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border border-dashed border-white/15 px-6 py-4 text-center">
          <span className="font-mono text-[10px] tracking-[0.12em] text-white/30 uppercase">
            {t.projects.detail.subdomainNote}
          </span>
        </div>

        <div className="mt-16 border border-teal/20 bg-teal/5 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white text-xl font-light">{t.projects.detail.ctaTitle}</div>
          <CalendlyButton className="shrink-0 px-8 py-4 bg-teal text-ink font-mono text-[12px] tracking-[0.1em] uppercase hover:bg-teal/80 transition-colors duration-200">
            {t.contact.scheduleCta}
          </CalendlyButton>
        </div>
      </div>
    </div>
  )
}
