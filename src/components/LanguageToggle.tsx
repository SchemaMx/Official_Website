import { useLanguage } from '@/i18n/LanguageContext'

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  return (
    <div className={`flex items-center border border-white/15 font-mono text-[11px] tracking-[0.1em] uppercase ${className}`}>
      <button
        onClick={() => setLanguage('es')}
        className={`px-2.5 py-1 transition-colors duration-200 ${
          language === 'es' ? 'bg-teal text-ink' : 'text-white/40 hover:text-white/70'
        }`}
        aria-pressed={language === 'es'}
      >
        ES
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 transition-colors duration-200 ${
          language === 'en' ? 'bg-teal text-ink' : 'text-white/40 hover:text-white/70'
        }`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  )
}
