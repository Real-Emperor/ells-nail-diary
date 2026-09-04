"use client"

import { useI18n } from "@/i18n/provider"
import { SITE_CONFIG } from "@/lib/site-config"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Facebook } from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"

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

// Speed in pixels per second — much faster now
const SCROLL_SPEED = 120 // was 50, now 120 — visibly faster

export function GallerySection() {
  const { t } = useI18n()
  const [reducedMotion, setReducedMotion] = useState(false)
  const [paused, setPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const [trackWidth, setTrackWidth] = useState(0)
  const [manualOffset, setManualOffset] = useState(0)

  // Drag state
  const dragStartX = useRef(0)
  const dragStartOffset = useRef(0)
  const dragDistance = useRef(0)

  // Check for reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const handler = () => setReducedMotion(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Measure the single-set width for seamless loop
  useEffect(() => {
    if (trackRef.current) {
      const singleSet = trackRef.current.querySelector("[data-set='0']") as HTMLElement
      if (singleSet) {
        setTrackWidth(singleSet.offsetWidth)
      }
    }
  }, [])

  // Animation: use requestAnimationFrame for smooth manual offset integration
  const animFrameRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const currentOffsetRef = useRef(0)

  const animate = useCallback((time: number) => {
    if (!trackWidth || reducedMotion) return

    if (lastTimeRef.current === 0) lastTimeRef.current = time
    const delta = time - lastTimeRef.current
    lastTimeRef.current = time

    if (!paused && !isDragging) {
      // Move forward by SCROLL_SPEED pixels per second
      currentOffsetRef.current -= (SCROLL_SPEED * delta) / 1000

      // Seamless loop: when we've scrolled past one full set, reset by +trackWidth
      // The track has 2 sets, so we loop within [-trackWidth, 0]
      if (currentOffsetRef.current <= -trackWidth) {
        currentOffsetRef.current += trackWidth
      }

      setManualOffset(currentOffsetRef.current)
    }

    animFrameRef.current = requestAnimationFrame(animate)
  }, [trackWidth, paused, isDragging, reducedMotion])

  useEffect(() => {
    if (!reducedMotion && trackWidth > 0) {
      animFrameRef.current = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animFrameRef.current)
    }
  }, [animate, reducedMotion, trackWidth])

  // Pointer drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (reducedMotion) return
    setIsDragging(true)
    dragStartX.current = e.clientX
    dragStartOffset.current = currentOffsetRef.current
    dragDistance.current = 0
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const dx = e.clientX - dragStartX.current
    dragDistance.current = dx
    let newOffset = dragStartOffset.current + dx

    // Seamless loop during drag
    if (newOffset > 0) newOffset -= trackWidth
    if (newOffset <= -trackWidth) newOffset += trackWidth

    currentOffsetRef.current = newOffset
    setManualOffset(newOffset)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false)
    try { (e.target as HTMLElement).releasePointerCapture(e.pointerId) } catch {}
  }

  const transform = `translateX(${manualOffset}px)`

  return (
    <section id="gallery" className="py-20 md:py-28 bg-stone-50 dark:bg-stone-950 overflow-hidden">
      <div className="container mx-auto px-4">
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

      {/* Horizontal auto-scrolling gallery */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-stone-50 dark:from-stone-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-stone-50 dark:from-stone-950 to-transparent z-10 pointer-events-none" />

        {reducedMotion ? (
          // Static horizontally scrollable gallery
          <div
            ref={trackRef}
            className="flex gap-4 md:gap-6 px-6 md:px-12 overflow-x-auto no-scrollbar pb-4"
          >
            {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, i) => (
              <GalleryItem key={i} src={img.src} alt={img.alt} />
            ))}
          </div>
        ) : (
          // Animated + draggable gallery
          <div
            className="relative cursor-grab active:cursor-grabbing select-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div
              ref={trackRef}
              className="flex will-change-transform"
              style={{ transform, transition: isDragging ? "none" : "none" }}
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

      {/* Hint text */}
      {!reducedMotion && (
        <p className="text-center text-xs text-stone-400 mt-4">
          {/* Hint in current language */}
          <span className="hidden:inline">Hover to pause · Drag to scroll manually</span>
        </p>
      )}

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
    </section>
  )
}

// Individual gallery item — uniform frame with object-fit: contain
function GalleryItem({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="flex-shrink-0 w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] rounded-2xl overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900 border border-stone-200 dark:border-stone-700 shadow-md hover:shadow-xl transition-shadow duration-300 group relative pointer-events-none"
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
