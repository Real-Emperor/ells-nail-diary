"use client"

import { useI18n } from "@/i18n/provider"
import { SITE_CONFIG } from "@/lib/site-config"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Facebook } from "lucide-react"
import { useState, useEffect, useRef } from "react"

// Real nail art photos by Ellah Cirujales
const GALLERY_IMAGES = [
  { src: "/gallery/ellah-work-1.jpg", alt: "Nail art by Ellah Cirujales" },
  { src: "/gallery/ellah-work-2.jpg", alt: "Nail art by Ellah Cirujales" },
  { src: "/gallery/ellah-work-3.jpg", alt: "Nail art by Ellah Cirujales" },
  { src: "/gallery/ellah-work-4.jpg", alt: "Nail art by Ellah Cirujales" },
  { src: "/gallery/ellah-work-5.jpg", alt: "Nail art by Ellah Cirujales" },
  { src: "/gallery/ellah-work-6.jpg", alt: "Nail art by Ellah Cirujales" },
  { src: "/gallery/ellah-work-7.jpg", alt: "Nail art by Ellah Cirujales" },
  { src: "/gallery/ellah-work-8.jpg", alt: "Nail art by Ellah Cirujales" },
  { src: "/gallery/ellah-work-9.jpg", alt: "Nail art by Ellah Cirujales" },
  { src: "/gallery/ellah-work-10.jpg", alt: "Nail art by Ellah Cirujales" },
]

export function GallerySection() {
  const { t } = useI18n()
  const [reducedMotion, setReducedMotion] = useState(false)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const [trackWidth, setTrackWidth] = useState(0)

  // Check for reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const handler = () => setReducedMotion(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Measure the single-set width to configure seamless loop
  useEffect(() => {
    if (trackRef.current) {
      // Width of one set of images
      const singleSet = trackRef.current.querySelector("[data-set='0']") as HTMLElement
      if (singleSet) {
        setTrackWidth(singleSet.offsetWidth)
      }
    }
  }, [])

  // The animation distance is exactly one set width
  // We duplicate the set and translate by the set width for seamless loop
  const animationDuration = trackWidth > 0 ? `${trackWidth / 40}s` : "120s" // ~40px per second

  return (
    <section id="gallery" className="py-20 md:py-28 bg-stone-50 dark:bg-stone-950 overflow-hidden">
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
            ✦ {t.gallery.title} ✦
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 dark:text-stone-100 mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t.gallery.title}
          </h2>
          <p className="text-base md:text-lg text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Horizontal auto-scrolling gallery — full width, no container constraint */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-stone-50 dark:from-stone-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-stone-50 dark:from-stone-950 to-transparent z-10 pointer-events-none" />

        {reducedMotion ? (
          // Static horizontally scrollable gallery for reduced motion
          <div
            ref={trackRef}
            className="flex gap-4 md:gap-6 px-6 md:px-12 overflow-x-auto no-scrollbar pb-4"
          >
            {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, i) => (
              <GalleryItem key={i} src={img.src} alt={img.alt} />
            ))}
          </div>
        ) : (
          // Animated infinite marquee gallery
          <div className="relative">
            <div
              ref={trackRef}
              className="flex gap-4 md:gap-6 will-change-transform"
              style={{
                animation: `gallery-marquee ${animationDuration} linear infinite`,
                animationPlayState: paused ? "paused" : "running",
              }}
            >
              {/* First set */}
              <div className="flex gap-4 md:gap-6 flex-shrink-0" data-set="0">
                {GALLERY_IMAGES.map((img, i) => (
                  <GalleryItem key={`set0-${i}`} src={img.src} alt={img.alt} />
                ))}
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex gap-4 md:gap-6 flex-shrink-0" data-set="1" aria-hidden="true">
                {GALLERY_IMAGES.map((img, i) => (
                  <GalleryItem key={`set1-${i}`} src={img.src} alt={img.alt} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Facebook CTA */}
      <div className="container mx-auto px-4 mt-10 text-center">
        <a href={SITE_CONFIG.facebook} target="_blank" rel="noopener noreferrer">
          <Button
            size="lg"
            className="bg-gradient-to-r from-rose-400 to-amber-400 hover:from-rose-500 hover:to-amber-500 text-white rounded-full px-8 shadow-md hover:shadow-lg transition-all"
          >
            <Facebook className="h-5 w-5 me-2" />
            {t.gallery.viewAll}
          </Button>
        </a>
      </div>

      {/* Inline CSS for the marquee animation */}
      <style jsx>{`
        @keyframes gallery-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}

// Individual gallery item — uniform frame with object-fit: contain
function GalleryItem({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="flex-shrink-0 w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] rounded-2xl overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900 border border-stone-200 dark:border-stone-700 shadow-md hover:shadow-xl transition-shadow duration-300 group relative"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        draggable={false}
      />
      {/* Subtle overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
    </div>
  )
}
