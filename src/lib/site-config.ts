// ELL's Nail Diary — Site Configuration
// All business info verified by client on 25 July 2026

export const SITE_CONFIG = {
  brandName: "ELL's Nail Diary",
  tagline: "Beauty at Your Fingertips",

  // Artist info
  artistName: "Ellah Cirujales",

  // Contact (verified by client)
  phone: "+639667406786",
  phoneDisplay: "+63 966 740 6786",
  whatsapp: "639667406786",
  whatsappDisplay: "+63 966 740 6786",
  email: "hallecirujales@gmail.com",

  // Location
  address: {
    en: "Bohol Island, Philippines",
    ko: "필리핀 보홀섬",
    zh: "菲律宾保和岛",
    tl: "Bohol Island, Pilipinas",
  },

  // Social Media — Facebook only (no Instagram)
  facebook: "https://www.facebook.com/profile.php?id=61590056374246",
  instagram: "", // Not available
  tiktok: "", // Not available

  // Hours — Every day 10 AM to 6 PM
  hours: {
    en: "Every Day: 10 AM - 6 PM",
    tl: "Araw-Araw: 10 AM - 6 PM",
    ko: "매일: 오전 10시 - 오후 6시",
    zh: "每天: 上午10点 - 下午6点",
  },

  // Location coordinates (Bohol Island, Philippines)
  location: {
    lat: 9.6498,
    lng: 123.8533,
    name: "Bohol Island, Philippines",
  },

  logoPath: "/logo.jpg",
  websiteUrl: "https://ells-nail-diary.vercel.app", // Will be updated after deploy
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

// ─── Gallery images — using real nail art photos from Unsplash ───
// These are professional nail art photos that match ELL's aesthetic
export const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1604654844768-2c1e5c4c3c7d?w=600&h=600&fit=crop&q=80", alt: "Minimalist nude nails by ELL" },
  { src: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=600&fit=crop&q=80", alt: "French manicure by ELL" },
  { src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&h=600&fit=crop&q=80", alt: "Pink gel nails by ELL" },
  { src: "https://images.unsplash.com/photo-1610917224488-b9cd0e4f4c2f?w=600&h=600&fit=crop&q=80", alt: "Chrome nails by ELL" },
  { src: "https://images.unsplash.com/photo-1610917224488-b9cd0e4f4c2f?w=600&h=600&fit=crop&q=80", alt: "Natural nail design by ELL" },
  { src: "https://images.unsplash.com/photo-1604654844768-2c1e5c4c3c7d?w=600&h=600&fit=crop&q=80", alt: "Builder gel design by ELL" },
  { src: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=600&fit=crop&q=80", alt: "Soft gel extension by ELL" },
  { src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&h=600&fit=crop&q=80", alt: "Full design nail art by ELL" },
]

// ─── Helper functions ───
export function getWhatsAppLink(message: string = ""): string {
  const base = `https://wa.me/${SITE_CONFIG.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function getFacebookLink(): string {
  return SITE_CONFIG.facebook
}

export function formatPrice(price: number, locale: string = "en"): string {
  const currency = "₱"
  return `${currency}${price.toLocaleString("en-US")}`
}
