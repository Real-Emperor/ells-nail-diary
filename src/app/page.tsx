"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero"
import { ServicesSection } from "@/components/sections/services"
import { GallerySection } from "@/components/sections/gallery"
import { AboutSection } from "@/components/sections/about"
import { LoyaltySection } from "@/components/sections/loyalty"
import { SocialSection } from "@/components/sections/social"
import { BookingSection } from "@/components/sections/booking"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-stone-950">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <AboutSection />
        <LoyaltySection />
        <SocialSection />
        <BookingSection />
      </main>
      <SiteFooter />
    </div>
  )
}
