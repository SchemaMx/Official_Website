import { useState } from 'react'
import { AbstractPortrait } from '@/components/AbstractPortrait'
import { useLanguage } from '@/i18n/LanguageContext'

import davidDominguez from '@/assets/team/david-dominguez.jpg'
import luisAngel from '@/assets/team/luis-angel.jpg'
import arturoSilva from '@/assets/team/arturo-silva.jpg'
import davidHeredia from '@/assets/team/david-heredia.jpg'
import emilyChan from '@/assets/team/emily-chan.jpg'
import anhafRafid from '@/assets/team/anhaf-rafid.jpg'

const PHOTOS: Record<string, string> = {
  'david-dominguez': davidDominguez,
  'luis-angel': luisAngel,
  'arturo-silva': arturoSilva,
  'david-heredia': davidHeredia,
  'emily-chan': emilyChan,
  'anhaf-rafid': anhafRafid,
}

const ACCENTS = ['#82c9c1', '#a4a7d4', '#e2eaf6']

type ResumeEntry = { year: string; title: string; org: string }
type Link = { label: string; href: string }
type Member = {
  name: string
  role: string
  photo: string
  tags: readonly string[]
  resume: readonly ResumeEntry[]
  links: readonly Link[]
}

export function TeamCard({ index, member }: { index: number; member: Member }) {
  const { t } = useLanguage()
  const [flipped, setFlipped] = useState(false)
  const photo = PHOTOS[member.photo]
  const accent = ACCENTS[index % ACCENTS.length]

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: '1000px', height: '480px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      aria-label={member.name}
    >
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 overflow-hidden bg-card"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {photo ? (
            <img
              src={photo}
              alt={member.name}
              className="w-full h-full object-cover object-top grayscale opacity-75 hover:opacity-80 transition-opacity duration-300"
            />
          ) : (
            <AbstractPortrait index={index} className="absolute inset-0 w-full h-full" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div
              className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1.5"
              style={{ color: accent + '99' }}
            >
              {member.role}
            </div>
            <div className="font-serif italic text-white text-[22px] leading-tight">{member.name}</div>
          </div>
          <div className="absolute top-4 right-4">
            <div className="w-7 h-7 border border-white/20 flex items-center justify-center">
              <span className="text-white/30 text-[10px]">↺</span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col p-6 overflow-y-auto bg-[#141412]"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderTop: `2px solid ${accent}50`,
          }}
        >
          <div className="mb-5">
            <div className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: accent }}>
              {member.role}
            </div>
            <div className="font-serif italic text-white text-[20px] leading-tight">{member.name}</div>
          </div>

          {/* Resume speedrun */}
          <div className="flex flex-col gap-3 mb-6 flex-1">
            {member.resume.map((entry, i) => (
              <div key={i} className="flex gap-3">
                <div className="font-mono text-[9px] tracking-[0.1em] mt-0.5 shrink-0 w-10" style={{ color: accent + '80' }}>
                  {entry.year}
                </div>
                <div>
                  <div className="text-white/80 text-[12px] font-medium leading-tight">{entry.title}</div>
                  <div className="text-white/35 text-[11px] mt-0.5">{entry.org}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {member.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[8px] tracking-[0.1em] uppercase px-1.5 py-0.5"
                style={{ color: accent + '70', border: `1px solid ${accent}20` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Social links */}
          <div className="flex gap-2 flex-wrap border-t border-white/8 pt-4">
            {member.links.length > 0 ? (
              member.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-mono text-[9px] tracking-[0.12em] uppercase px-3 py-1.5 border border-white/12 text-white/35 hover:text-white/80 hover:border-white/30 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))
            ) : (
              <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/25">
                {t.team.linksTitle} — {t.team.linksComingSoon}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
