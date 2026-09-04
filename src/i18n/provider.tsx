"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Locale, translations } from "./messages"

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (typeof translations)["en"]
  dir: "ltr" | "rtl"
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  // Load saved locale on mount (client-side only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ell-locale")
      if (saved && ["en", "tl", "ko", "zh"].includes(saved)) {
        setLocaleState(saved as Locale)
      }
    } catch {}
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    try {
      localStorage.setItem("ell-locale", newLocale)
    } catch {}
  }

  const t = translations[locale]
  const dir: "ltr" | "rtl" = "ltr"

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error("useI18n must be used within I18nProvider")
  return context
}
