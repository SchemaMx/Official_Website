const PALETTES = [
  ['#82c9c1', '#a4a7d4'],
  ['#a4a7d4', '#e2eaf6'],
  ['#e2eaf6', '#82c9c1'],
  ['#82c9c1', '#e2eaf6'],
]

/**
 * Brand-patterned placeholder art (echoes the logo's parallelogram motif) for
 * role cards that don't have a real headshot yet — deliberately abstract so
 * it can't be mistaken for a photo of an actual person.
 */
export function AbstractPortrait({ index, className = '' }: { index: number; className?: string }) {
  const [c1, c2] = PALETTES[index % PALETTES.length]
  const gradId = `portrait-grad-${index}`
  const flip = index % 2 === 1
  const skew = 14 + (index % 3) * 4

  return (
    <svg viewBox="0 0 300 380" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <rect width="300" height="380" fill="#1d1d1b" />
      <rect width="300" height="380" fill="url(#Portrait-dots)" opacity="0.5" />
      <pattern id="Portrait-dots" width="18" height="18" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill={c1} opacity="0.15" />
      </pattern>
      <g transform={flip ? 'translate(300,0) scale(-1,1)' : undefined} opacity="0.92">
        <polygon points={`110,${60 + skew} 210,110 210,260 110,${210 + skew}`} fill={`url(#${gradId})`} opacity="0.85" />
        <polygon points="60,140 150,190 150,340 60,290" fill={`url(#${gradId})`} opacity="0.55" />
      </g>
      <rect width="300" height="380" fill="url(#Portrait-vignette)" />
      <radialGradient id="Portrait-vignette" cx="50%" cy="40%" r="75%">
        <stop offset="60%" stopColor="#1d1d1b" stopOpacity="0" />
        <stop offset="100%" stopColor="#1d1d1b" stopOpacity="0.55" />
      </radialGradient>
    </svg>
  )
}
