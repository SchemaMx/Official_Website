import { useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'

export function Scope() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState(0)
  const active = t.scope.groups[activeTab]

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="pt-12 pb-20 border-b border-white/7">
          <div className="font-mono text-[10px] tracking-[0.2em] text-teal uppercase mb-6">{t.scope.eyebrow}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1.05] text-white">
              {t.scope.title1}
              <br />
              <span className="font-serif italic text-purple">{t.scope.title2}</span>
            </h1>
            <p className="text-white/40 text-base leading-relaxed">{t.scope.intro}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/7 mt-12">
          {t.scope.groups.map((g, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`text-left p-7 transition-all duration-200 group ${
                activeTab === i ? 'bg-card' : 'bg-ink hover:bg-card/60'
              }`}
            >
              <div
                className={`font-mono text-[9px] tracking-[0.2em] uppercase mb-3 transition-colors ${
                  activeTab === i ? 'text-teal' : 'text-white/25'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div
                className={`text-[15px] font-medium mb-2 transition-colors ${
                  activeTab === i ? 'text-teal' : 'text-white/70 group-hover:text-white/90'
                }`}
              >
                {g.label}
              </div>
              {activeTab === i && <div className="w-8 h-px bg-teal/60 mt-3" />}
            </button>
          ))}
        </div>

        <div className="border border-white/7 border-t-0 p-8 md:p-12 bg-card" key={activeTab}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-xl md:text-2xl font-light text-white mb-4">{active.title}</h2>
              <p className="text-white/40 leading-relaxed text-[14px]">{active.description}</p>
            </div>
            <div className="lg:col-span-3 flex flex-wrap gap-px bg-white/7">
              {active.items.map((item, i) => (
                <div
                  key={i}
                  className="flex-1 min-w-[240px] bg-ink p-6 hover:bg-card/60 transition-colors duration-200"
                >
                  <div className="font-mono text-[9px] tracking-[0.2em] text-teal/50 mb-3">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="text-white/85 text-[13px] font-medium mb-2">{item.name}</div>
                  <div className="text-white/35 text-[12px] leading-relaxed mb-4">{item.detail}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[8px] tracking-[0.1em] uppercase text-purple/60 border border-purple/15 px-1.5 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process strip */}
        <div className="mt-20 pt-16 border-t border-white/7">
          <div className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-12">
            {t.scope.processTitle}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/7">
            {t.scope.process.map((p) => (
              <div key={p.step} className="bg-ink p-7">
                <div className="font-mono text-[10px] tracking-[0.2em] text-teal/40 mb-4">{p.step}</div>
                <div className="text-white font-medium mb-2">{p.title}</div>
                <div className="text-white/35 text-[13px] leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
