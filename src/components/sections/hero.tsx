"use client"

import { useI18n } from "@/i18n/provider"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function HeroSection() {
  const { t } = useI18n()
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background — poster image always shows first, video loads after */}
      <div className="absolute inset-0 z-0">
        {/* Poster image — always visible immediately */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/cover-photo.jpg)" }}
        />
        {/* Video — loads after client hydration, doesn't block initial render */}
        {isClient && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/cover-photo.jpg"
            onLoadedData={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? "opacity-30" : "opacity-0"
            }`}
          >
            <source src="/nail-video.mp4" type="video/mp4" />
          </video>
        )}
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/70 via-stone-50/75 to-white dark:from-stone-950/70 dark:via-stone-950/75 dark:to-stone-950" />
        {/* Decorative blurred circles */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-rose-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-rose-100/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span className="text-sm font-medium text-rose-600 dark:text-rose-300 tracking-wide">
              {t.hero.tagline}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-stone-800 dark:text-stone-100 mb-6 leading-[1.1]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-stone-600 dark:text-stone-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#booking" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-rose-400 hover:bg-rose-500 text-white rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all"
              >
                <Calendar className="h-5 w-5 me-2" />
                {t.hero.cta}
              </Button>
            </a>
            <a href="#gallery" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-full px-8 py-6 text-base border-stone-300 dark:border-stone-700 hover:border-rose-400 hover:text-rose-500 transition-all"
              >
                {t.hero.ctaSecondary}
                <ArrowRight className="h-5 w-5 ms-2" />
              </Button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-1 text-stone-400"
        >
          <span className="text-xs tracking-widest uppercase">{t.hero.scroll}</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
