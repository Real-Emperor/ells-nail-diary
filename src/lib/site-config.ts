// ELL's Nail Diary — Site Configuration
// Central source of truth for business contact info, services, and brand data

export const SITE_CONFIG = {
  brandName: "ELL's Nail Diary",
  tagline: "Beauty at Your Fingertips",

  // Contact
  phone: "+639171234567", // Placeholder — replace with real number
  phoneDisplay: "+63 917 123 4567",
  whatsapp: "639171234567",
  whatsappDisplay: "+63 917 123 4567",
  email: "ellsnaildiary@gmail.com",

  // Location
  address: {
    en: "Bohol Island, Philippines",
    ko: "필리핀 보홀섬",
    zh: "菲律宾保和岛",
    tl: "Bohol Island, Pilipinas",
  },

  // Social Media
  instagram: "https://instagram.com/ellsnaildiary",
  instagramHandle: "@ellsnaildiary",
  facebook: "https://facebook.com/ellsnaildiary",
  tiktok: "https://tiktok.com/@ellsnaildiary",

  // Hours
  hours: {
    en: "Mon - Sat: 9 AM - 6 PM",
    tl: "Lun - Sab: 9 AM - 6 PM",
    ko: "월-토: 오전 9시-오후 6시",
    zh: "周一至周六: 上午9点 - 下午6点",
  },

  // Location coordinates (Bohol Island, Philippines — Tagbilaran area)
  location: {
    lat: 9.6498,
    lng: 123.8533,
    name: "Bohol Island, Philippines",
  },

  logoPath: "/logo.jpg",
} as const

// ─── Service Categories with prices (in PHP) ───
export const SERVICE_CATEGORIES = [
  {
    categoryKey: "plain" as const,
    items: [
      { key: "gelManicure", price: 230 },
      { key: "builderGelPlain", price: 400 },
      { key: "softGelPlain", price: 450 },
    ],
  },
  {
    categoryKey: "minimal" as const,
    items: [
      { key: "builderGelMin", price: 459 },
      { key: "softGelMin", price: 499 },
    ],
  },
  {
    categoryKey: "full" as const,
    items: [
      { key: "builderGelFull", price: 499 },
      { key: "softGelFull", price: 649 },
    ],
  },
  {
    categoryKey: "addons" as const,
    perNail: true,
    items: [
      { key: "simpleArt", price: 10 },
      { key: "detailedArt", priceFrom: 15, priceTo: 30 },
      { key: "chrome", priceFrom: 10, priceTo: 50 },
      { key: "charms", priceFrom: 10 },
    ],
  },
  {
    categoryKey: "removal" as const,
    items: [
      { key: "removalOnly", price: 150 },
      { key: "removalClean", price: 200 },
      { key: "notMyWork", price: 100 },
      { key: "myWork", price: 50 },
    ],
  },
  {
    categoryKey: "homeservice" as const,
    items: [
      { key: "homeFee", price: 200 },
      { key: "transportFee", priceFrom: 100, priceTo: 200 },
    ],
  },
  {
    categoryKey: "policies" as const,
    items: [
      { key: "cancellationFee", price: 100 },
      { key: "lateFee", priceFrom: 50, priceTo: 100 },
    ],
  },
] as const

// ─── Gallery images (will use uploaded nail art photos) ───
export const GALLERY_IMAGES = [
  { src: "/cover-photo.jpg", alt: "Nail art by ELL" },
  { src: "/gallery-1.jpg", alt: "Minimalist nail design" },
  { src: "/gallery-2.jpg", alt: "Korean style natural nails" },
  { src: "/gallery-3.jpg", alt: "Detailed nail art" },
  { src: "/gallery-4.jpg", alt: "Chrome nail design" },
  { src: "/gallery-5.jpg", alt: "Soft gel extension" },
  { src: "/gallery-6.jpg", alt: "Builder gel design" },
  { src: "/gallery-7.jpg", alt: "Nail charms and accessories" },
  { src: "/gallery-8.jpg", alt: "Full design nail art" },
]

// ─── Helper functions ───
export function getWhatsAppLink(message: string = ""): string {
  const base = `https://wa.me/${SITE_CONFIG.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function formatPrice(price: number, locale: string = "en"): string {
  const currency = "₱"
  return `${currency}${price.toLocaleString("en-US")}`
}
