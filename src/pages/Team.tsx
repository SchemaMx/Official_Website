import { useLanguage } from '@/i18n/LanguageContext'
import { TeamCard } from '@/components/TeamCard'

export function Team() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="pt-12 pb-20 border-b border-white/7">
          <div className="font-mono text-[10px] tracking-[0.2em] text-teal uppercase mb-6">{t.team.eyebrow}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1.05] text-white">
              {t.team.title1}
              <br />
              <span className="font-serif italic text-purple">{t.team.title2}</span>
            </h1>
            <p className="text-white/40 text-base leading-relaxed">
              {t.team.intro}
              <br />
              <span className="font-mono text-[11px] tracking-[0.12em] text-white/25 uppercase mt-3 inline-block">
                {t.team.membersNote}
              </span>
            </p>
          </div>
        </div>

      </div>

      {/* Team — full-bleed */}
      <div className="mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10 mb-10">
          <div className="text-white text-xl font-light">{t.team.membersTitle}</div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-white/7">
          {t.team.members.map((member, i) => (
            <TeamCard key={member.name} index={i} member={member} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Values */}
        <div className="mt-24 pt-16 border-t border-white/7">
          <div className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-10">
            {t.team.valuesTitle}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {t.team.values.map((v) => (
              <div key={v.label}>
                <div className="w-6 h-px bg-teal/50 mb-4" />
                <div className="text-white font-medium mb-2">{v.label}</div>
                <div className="text-white/35 text-[13px] leading-relaxed">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
