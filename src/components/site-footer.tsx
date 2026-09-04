"use client"

import { useI18n } from "@/i18n/provider"
import { SITE_CONFIG, getWhatsAppLink } from "@/lib/site-config"
import { Facebook, MapPin, Phone, Mail, Clock, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteFooter() {
  const { t, locale } = useI18n()

  const quickLinks = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.gallery, href: "#gallery" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.loyalty, href: "#loyalty" },
  ]

  const getHours = () => {
    if (locale === "ko") return SITE_CONFIG.hours.ko
    if (locale === "zh") return SITE_CONFIG.hours.zh
    if (locale === "tl") return SITE_CONFIG.hours.tl
    return SITE_CONFIG.hours.en
  }

  const getAddress = () => {
    if (locale === "ko") return SITE_CONFIG.address.ko
    if (locale === "zh") return SITE_CONFIG.address.zh
    if (locale === "tl") return SITE_CONFIG.address.tl
    return SITE_CONFIG.address.en
  }

  return (
    <footer className="bg-stone-900 dark:bg-stone-950 text-stone-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-rose-400/30">
                <img
                  src={SITE_CONFIG.logoPath}
                  alt="ELL's Nail Diary"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  ELL's
                </div>
                <div className="text-xs text-rose-400 tracking-[0.2em] uppercase">
                  Nail Diary
                </div>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed mb-4">
              {t.footer.tagline}
            </p>
            {/* Social icons — Facebook + WhatsApp only */}
            <div className="flex gap-3">
              <a
                href={SITE_CONFIG.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-rose-500 flex items-center justify-center transition-colors"
              >
                <Facebook className="h-4 w-4 text-white" />
              </a>
              <a
                href={getWhatsAppLink(t.whatsapp.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-rose-500 flex items-center justify-center transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-rose-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t.footer.contact}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span className="text-stone-400">{getAddress()}</span>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-start gap-3 text-stone-400 hover:text-rose-400 transition-colors"
                >
                  <Phone className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span dir="ltr">{SITE_CONFIG.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-3 text-stone-400 hover:text-rose-400 transition-colors"
                >
                  <Mail className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span className="break-all text-xs">{SITE_CONFIG.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span className="text-stone-400">{getHours()}</span>
              </li>
            </ul>
          </div>

          {/* Book Now */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t.footer.bookNow}
            </h3>
            <p className="text-sm text-stone-400 mb-4">
              {t.hero.subtitle}
            </p>
            <a href="#booking" className="inline-block">
              <Button className="bg-rose-400 hover:bg-rose-500 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all">
                {t.nav.book}
              </Button>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 pt-6 flex flex-col items-center gap-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full">
            <p className="text-xs text-stone-500 text-center md:text-left">
              © {new Date().getFullYear()} {SITE_CONFIG.brandName} · {SITE_CONFIG.artistName}. {t.footer.rights}
            </p>
            <p className="text-xs text-stone-500 flex items-center gap-1.5">
              {t.footer.madeWith}
              <Heart className="h-3 w-3 text-rose-400 fill-rose-400" />
              {t.footer.inBohol}
            </p>
          </div>
          {/* Phronesis Studio signature */}
          <div className="border-t border-stone-800/50 pt-4 mt-2 flex items-center gap-2">
            <span className="text-xs text-stone-500">Website crafted by</span>
            <a
              href="https://phronesis-studio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 group"
            >
              <img
                src="/logo.svg"
                alt="Phronesis Studio"
                className="h-5 w-5 object-contain opacity-60 group-hover:opacity-100 transition-opacity"
              />
              <span
                className="text-xs font-semibold text-stone-400 group-hover:text-rose-400 transition-colors"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Phronesis Studio
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
