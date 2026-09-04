import type { Metadata } from "next"
import { Inter, Playfair_Display, Noto_Sans_KR, Noto_Sans_SC } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { I18nProvider } from "@/i18n/provider"
import { SITE_CONFIG } from "@/lib/site-config"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
})

const notoKR = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

const notoSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: `${SITE_CONFIG.brandName} | ${SITE_CONFIG.tagline}`,
  description: "Personalized nail artistry in the heart of Bohol Island, Philippines. Book your appointment with ELL's Nail Diary for premium nail care, Korean-style natural nails, and intricate nail art.",
  keywords: ["nail salon Bohol", "nail art Philippines", "ELL's Nail Diary", "nail studio Bohol", "Korean nails Philippines", "gel manicure Bohol", "nail extensions Philippines"],
  authors: [{ name: SITE_CONFIG.brandName }],
  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    title: `${SITE_CONFIG.brandName} | ${SITE_CONFIG.tagline}`,
    description: "Personalized nail artistry in the heart of Bohol Island, Philippines.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.brandName,
    description: SITE_CONFIG.tagline,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${notoKR.variable} ${notoSC.variable} antialiased bg-background text-foreground`}
      >
        <I18nProvider>
          {children}
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  )
}
