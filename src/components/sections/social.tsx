"use client"

import { useI18n } from "@/i18n/provider"
import { SITE_CONFIG } from "@/lib/site-config"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Facebook } from "lucide-react"

export function SocialSection() {
  const { t } = useI18n()

  const feedImages = [
    "/gallery/gallery-1.jpg",
    "/gallery/gallery-2.jpg",
    "/gallery/gallery-5.jpg",
    "/gallery/gallery-6.jpg",
    "/gallery/gallery-7.jpg",
    "/gallery/gallery-10.jpg",
  ]

  return (
    <section id="social" className="py-20 md:py-28 bg-stone-50 dark:bg-stone-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-rose-100 dark:bg-rose-950/30 text-rose-500 text-sm font-medium tracking-wide">
            ✦ Facebook ✦
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 dark:text-stone-100 mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t.social.title}
          </h2>
          <p className="text-base md:text-lg text-stone-500 dark:text-stone-400 max-w-2xl mx-auto mb-4">
            {t.social.subtitle}
          </p>
          <a
            href={SITE_CONFIG.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-600 font-medium transition-colors"
          >
            <Facebook className="h-5 w-5" />
            {t.social.follow}
          </a>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {feedImages.map((src, i) => (
              <motion.a
                key={i}
                href={SITE_CONFIG.facebook}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="aspect-square overflow-hidden rounded-xl group relative"
              >
                <img
                  src={src}
                  alt={`Nail art ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-all duration-300 flex items-center justify-center">
                  <Facebook className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a href={SITE_CONFIG.facebook} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-rose-300 hover:bg-rose-50 hover:border-rose-400 dark:border-rose-900 dark:hover:bg-rose-950/30 transition-all"
            >
              <Facebook className="h-5 w-5 me-2 text-rose-500" />
              {t.social.follow}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
