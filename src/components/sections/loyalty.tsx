"use client"

import { useI18n } from "@/i18n/provider"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Heart, Gift, Award } from "lucide-react"

export function LoyaltySection() {
  const { t } = useI18n()

  const rewards = [
    { stamp: 3, label: t.loyalty.rewards.stamp3, icon: Heart },
    { stamp: 6, label: t.loyalty.rewards.stamp6, icon: Award },
    { stamp: 10, label: t.loyalty.rewards.stamp10, icon: Gift },
  ]

  return (
    <section id="loyalty" className="py-20 md:py-28 bg-gradient-to-b from-rose-50/50 via-amber-50/30 to-white dark:from-stone-900 dark:via-stone-950 dark:to-stone-950">
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
            ✦ {t.loyalty.title} ✦
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 dark:text-stone-100 mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t.loyalty.title}
          </h2>
          <p className="text-base md:text-lg text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
            {t.loyalty.subtitle}
          </p>
        </motion.div>

        {/* Loyalty card visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <Card className="p-8 md:p-10 bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-900 dark:to-stone-800 border-2 border-rose-200 dark:border-rose-900 rounded-3xl shadow-xl overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-rose-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Brand header */}
              <div className="text-center mb-8">
                <div
                  className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100 mb-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  ELL's
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-8 h-px bg-rose-400" />
                  <span className="text-xs tracking-[0.3em] text-stone-500 dark:text-stone-400 uppercase">
                    Nail Diary
                  </span>
                  <span className="w-8 h-px bg-rose-400" />
                </div>
                <div className="mt-2 text-lg text-stone-600 dark:text-stone-300 italic" style={{ fontFamily: "var(--font-playfair)" }}>
                  Loyalty Card
                </div>
              </div>

              {/* Stamp circles */}
              <div className="grid grid-cols-5 gap-3 md:gap-4 mb-8">
                {Array.from({ length: 10 }).map((_, i) => {
                  const stampNum = i + 1
                  const isReward = stampNum === 3 || stampNum === 6 || stampNum === 10
                  const rewardText =
                    stampNum === 3 ? "10%" :
                    stampNum === 6 ? "20%" :
                    stampNum === 10 ? "Free" : ""
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.08 }}
                      className={`aspect-square rounded-full flex flex-col items-center justify-center border-2 transition-all ${
                        stampNum === 10
                          ? "bg-rose-400 border-rose-400 text-white shadow-lg"
                          : isReward
                          ? "border-rose-300 bg-rose-50 dark:bg-rose-950/20 text-rose-500"
                          : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-400"
                      }`}
                    >
                      <span className={`text-sm md:text-base font-bold ${stampNum === 10 ? "" : "text-stone-600 dark:text-stone-300"}`}>
                        {stampNum}
                      </span>
                      {isReward && (
                        <span className={`text-[9px] md:text-[10px] font-medium ${stampNum === 10 ? "text-white italic" : "text-rose-400"}`}>
                          {rewardText}
                        </span>
                      )}
                      {(stampNum !== 10) && (
                        <Heart className={`h-2.5 w-2.5 mt-0.5 ${isReward ? "fill-rose-400 text-rose-400" : "text-stone-300"}`} />
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* Footer message */}
              <div className="text-center">
                <div className="inline-block px-6 py-2 bg-stone-800 dark:bg-stone-700 text-white text-sm font-medium rounded-full">
                  {t.loyalty.collect}
                </div>
                <p className="mt-3 text-sm text-stone-500 dark:text-stone-400 italic">
                  {t.loyalty.thankYou}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-center text-xl font-semibold text-stone-700 dark:text-stone-200 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            {t.loyalty.howItWorks}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rewards.map((reward, i) => {
              const Icon = reward.icon
              return (
                <Card key={i} className="p-5 text-center border-rose-100 dark:border-stone-800 rounded-2xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-rose-500 mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                    {reward.stamp}
                  </div>
                  <p className="text-sm text-stone-600 dark:text-stone-300">
                    {reward.label}
                  </p>
                </Card>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
