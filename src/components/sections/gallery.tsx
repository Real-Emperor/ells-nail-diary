"use client"

import { useI18n } from "@/i18n/provider"
import { SITE_CONFIG } from "@/lib/site-config"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Instagram } from "lucide-react"

export function GallerySection() {
  const { t } = useI18n()

  // Use a mix of Unsplash nail art images since we don't have the artist's full gallery
  // These are professional nail art photos that match the aesthetic
  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1604654844768-2c1e5c4c3c7d?w=600&h=600&fit=crop&q=80", alt: "Minimalist nude nails", size: "tall" },
    { src: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=600&fit=crop&q=80", alt: "French manicure", size: "normal" },
    { src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&h=600&fit=crop&q=80", alt: "Pink gel nails", size: "wide" },
    { src: "https://images.unsplash.com/photo-1610917224488-b9cd0e4f4c2f?w=600&h=600&fit=crop&q=80", alt: "Chrome nails", size: "normal" },
    { src: "https://images.unsplash.com/photo-1604654844768-2c1e5c4c3c7d?w=600&h=600&fit=crop&q=80", alt: "Natural nail design", size: "tall" },
    { src: "https://images.unsplash.com/photo-1610917224488-b9cd0e4f4c2f?w=600&h=600&fit=crop&q=80", alt: "Nail art design", size: "normal" },
    { src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&h=600&fit=crop&q=80", alt: "Builder gel design", size: "wide" },
    { src: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=600&fit=crop&q=80", alt: "Soft gel extension", size: "normal" },
  ]

  return (
    <section id="gallery" className="py-20 md:py-28 bg-stone-50 dark:bg-stone-950">
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

        {/* Gallery grid — masonry style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                img.size === "tall" ? "row-span-2" : img.size === "wide" ? "col-span-2" : ""
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-10">
          <a href={SITE_CONFIG.instagram} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-gradient-to-r from-rose-400 to-amber-400 hover:from-rose-500 hover:to-amber-500 text-white rounded-full px-8 shadow-md hover:shadow-lg transition-all"
            >
              <Instagram className="h-5 w-5 me-2" />
              {t.gallery.viewAll}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
