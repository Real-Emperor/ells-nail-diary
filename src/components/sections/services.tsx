"use client"

import { useI18n } from "@/i18n/provider"
import { SERVICE_CATEGORIES, formatPrice } from "@/lib/site-config"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  Sparkles, Gem, Hand, Home, ShieldCheck, Gift,
} from "lucide-react"

const CATEGORY_ICONS: Record<string, any> = {
  plain: Sparkles,
  minimal: Gem,
  full: Hand,
  addons: Sparkles,
  removal: ShieldCheck,
  homeservice: Home,
  policies: ShieldCheck,
  complimentary: Gift,
}

export function ServicesSection() {
  const { t, locale } = useI18n()

  return (
    <section id="services" className="py-20 md:py-28 bg-gradient-to-b from-white via-rose-50/30 to-white dark:from-stone-950 dark:via-stone-900/30 dark:to-stone-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-rose-100 dark:bg-rose-950/30 text-rose-500 text-sm font-medium tracking-wide">
            ✦ {t.services.title} ✦
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 dark:text-stone-100 mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t.services.title}
          </h2>
          <p className="text-base md:text-lg text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Service categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICE_CATEGORIES.map((cat, catIdx) => {
            const Icon = CATEGORY_ICONS[cat.categoryKey] || Sparkles
            const items = cat.items as readonly { key: string; price?: number; priceFrom?: number; priceTo?: number }[]
            return (
              <motion.div
                key={cat.categoryKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              >
                <Card className="p-6 h-full border-rose-100 dark:border-stone-800 hover:shadow-xl hover:border-rose-200 dark:hover:border-rose-900 transition-all duration-300 rounded-2xl group">
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-rose-50 dark:border-stone-800">
                    <div className="w-11 h-11 rounded-full bg-rose-100 dark:bg-rose-950/30 flex items-center justify-center group-hover:bg-rose-400 transition-colors">
                      <Icon className="h-5 w-5 text-rose-500 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100" style={{ fontFamily: "var(--font-playfair)" }}>
                      {t.services.categories[cat.categoryKey]}
                    </h3>
                  </div>

                  {/* Items */}
                  <ul className="space-y-3">
                    {items.map((item) => {
                      const label = t.services.items[item.key as keyof typeof t.services.items]
                      let priceText = ""
                      if (item.price !== undefined) {
                        priceText = formatPrice(item.price, locale)
                      } else if (item.priceFrom !== undefined) {
                        priceText = item.priceTo
                          ? `${formatPrice(item.priceFrom, locale)} - ${formatPrice(item.priceTo, locale)}`
                          : `${t.services.from} ${formatPrice(item.priceFrom, locale)}`
                      }
                      return (
                        <li
                          key={item.key}
                          className="flex items-start justify-between gap-3 text-sm"
                        >
                          <span className="text-stone-600 dark:text-stone-300 flex-1">
                            {label}
                            {(cat as any).perNail && (
                              <span className="text-xs text-stone-400 ml-1">
                                ({t.services.perNail})
                              </span>
                            )}
                          </span>
                          <span className="font-semibold text-rose-500 whitespace-nowrap">
                            {priceText}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Complimentary services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 md:p-8 bg-gradient-to-r from-rose-50 to-amber-50 dark:from-stone-900 dark:to-stone-900 border-rose-200 dark:border-stone-800 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-rose-400 flex items-center justify-center">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100" style={{ fontFamily: "var(--font-playfair)" }}>
                {t.services.categories.complimentary}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white/60 dark:bg-stone-950/40 rounded-xl">
                <Sparkles className="h-5 w-5 text-rose-400 flex-shrink-0" />
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  {t.services.complimentary.relaxing}
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/60 dark:bg-stone-950/40 rounded-xl">
                <ShieldCheck className="h-5 w-5 text-rose-400 flex-shrink-0" />
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  {t.services.complimentary.consultation}
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/60 dark:bg-stone-950/40 rounded-xl">
                <Gem className="h-5 w-5 text-rose-400 flex-shrink-0" />
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  {t.services.complimentary.quality}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Policy notes */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {[t.services.notes.homeService, t.services.notes.bookingFee, t.services.notes.arriveOnTime, t.services.notes.noShow].map((note, i) => (
            <div key={i} className="flex items-start gap-2 text-stone-500 dark:text-stone-400">
              <span className="text-rose-400 mt-0.5">•</span>
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
