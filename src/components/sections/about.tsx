"use client"

import { useI18n } from "@/i18n/provider"
import { SITE_CONFIG } from "@/lib/site-config"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Heart, Star, Sparkles } from "lucide-react"

export function AboutSection() {
  const { t } = useI18n()

  const stats = [
    { icon: Heart, value: "200+", label: t.about.stats.clients },
    { icon: Sparkles, value: "150+", label: t.about.stats.designs },
    { icon: Star, value: "5.0", label: t.about.stats.rating },
  ]

  return (
    <section id="about" className="py-20 md:py-28 bg-white dark:bg-stone-950">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Decorative frame */}
              <div className="relative">
                {/* Background decorative element */}
                <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2 border-rose-200 dark:border-rose-900" />
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl bg-amber-100/50 dark:bg-amber-950/20" />
                {/* Image */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src="/cover-photo.jpg"
                    alt="ELL — Nail Artist"
                    className="w-full h-full object-cover"
                  />
                  {/* Name badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 dark:bg-stone-950/90 backdrop-blur-sm rounded-2xl border border-rose-100 dark:border-stone-800">
                    <div
                      className="text-xl font-bold text-stone-800 dark:text-stone-100"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {SITE_CONFIG.artistName}
                    </div>
                    <div className="text-sm text-rose-500 tracking-wide">Nail Artist</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-rose-100 dark:bg-rose-950/30 text-rose-500 text-sm font-medium tracking-wide">
                ✦ {t.about.title} ✦
              </div>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 dark:text-stone-100 mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {t.about.title}
              </h2>
              <p className="text-sm text-rose-400 mb-6 tracking-wide">{t.about.subtitle}</p>

              <div className="space-y-4 mb-8">
                <p className="text-base text-stone-600 dark:text-stone-300 leading-relaxed">
                  {t.about.bio1}
                </p>
                <p className="text-base text-stone-600 dark:text-stone-300 leading-relaxed">
                  {t.about.bio2}
                </p>
                <p className="text-base text-stone-600 dark:text-stone-300 leading-relaxed italic">
                  {t.about.bio3}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, i) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    >
                      <Card className="p-4 md:p-5 text-center border-rose-100 dark:border-stone-800 rounded-2xl hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-rose-100 dark:bg-rose-950/30 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-rose-400" />
                        </div>
                        <div
                          className="text-2xl font-bold text-stone-800 dark:text-stone-100"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                          {stat.label}
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
