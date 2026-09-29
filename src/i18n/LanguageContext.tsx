import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { es } from './es'
import { en } from './en'

export type Language = 'es' | 'en'
export type Dictionary = typeof es

const dictionaries: Record<Language, Dictionary> = { es, en }
const STORAGE_KEY = 'schema-language'

type LanguageContextValue = {
  language: Language
  setLanguage: (lang: Language) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start on the prerendered default so the first client render matches
  // the server-rendered HTML; a stored preference is applied right after.
  const [language, setLanguageState] = useState<Language>('es')

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === 'en' || stored === 'es') setLanguageState(stored)
    } catch {
      // localStorage unavailable (private mode) - stay on the default
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  function setLanguage(lang: Language) {
    setLanguageState(lang)
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // localStorage unavailable (private mode) - language just won't persist
    }
  }

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t: dictionaries[language] }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
