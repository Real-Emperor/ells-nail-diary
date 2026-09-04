"use client"

import { useState, useEffect } from "react"
import { useI18n } from "@/i18n/provider"
import { SITE_CONFIG } from "@/lib/site-config"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Menu, X, Calendar } from "lucide-react"
import { getWhatsAppLink } from "@/lib/site-config"

export function SiteHeader() {
  const { t, locale } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navItems = [
    { key: "home", href: "#home" },
    { key: "services", href: "#services" },
    { key: "gallery", href: "#gallery" },
    { key: "about", href: "#about" },
    { key: "loyalty", href: "#loyalty" },
  ] as const

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-stone-950/90 backdrop-blur-md shadow-sm border-b border-rose-100 dark:border-stone-800"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-rose-200 dark:ring-stone-700 group-hover:ring-rose-400 transition-all">
              <img
                src={SITE_CONFIG.logoPath}
                alt="ELL's Nail Diary"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <div
                className="text-lg md:text-xl font-bold text-stone-800 dark:text-stone-100 leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                ELL's
              </div>
              <div className="text-[10px] md:text-xs text-rose-400 tracking-[0.2em] uppercase">
                Nail Diary
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <a
                key={item.key}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
              >
                {t.nav[item.key]}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <a
              href="#booking"
              className="hidden md:inline-flex"
            >
              <Button
                size="sm"
                className="bg-rose-400 hover:bg-rose-500 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all"
              >
                <Calendar className="h-4 w-4 me-2" />
                {t.nav.book}
              </Button>
            </a>
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden py-4 border-t border-rose-100 dark:border-stone-800 space-y-1">
            {navItems.map(item => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-stone-600 dark:text-stone-300 hover:bg-rose-50 dark:hover:bg-stone-800 rounded-lg transition-colors"
              >
                {t.nav[item.key]}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5"
            >
              <Button className="w-full bg-rose-400 hover:bg-rose-500 text-white rounded-full">
                <Calendar className="h-4 w-4 me-2" />
                {t.nav.book}
              </Button>
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
