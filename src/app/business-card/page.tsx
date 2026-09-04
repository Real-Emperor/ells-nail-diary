"use client"

import { useI18n } from "@/i18n/provider"
import { SITE_CONFIG } from "@/lib/site-config"
import { QRCodeSVG } from "qrcode.react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Facebook, MessageCircle, Download } from "lucide-react"
import { toast } from "sonner"

export default function BusinessCardPage() {
  const { t, locale } = useI18n()

  const websiteUrl = SITE_CONFIG.websiteUrl || "https://ells-nail-diary.vercel.app"

  const handleDownload = () => {
    toast.success(locale === "ko" ? "명함을 저장하려면 스크린샷을 찍으세요" :
      locale === "zh" ? "请截图保存名片" :
      locale === "tl" ? "I-screenshot ang business card" :
      "Take a screenshot to save the business card")
  }

  const getHours = () => {
    if (locale === "ko") return SITE_CONFIG.hours.ko
    if (locale === "zh") return SITE_CONFIG.hours.zh
    if (locale === "tl") return SITE_CONFIG.hours.tl
    return SITE_CONFIG.hours.en
  }

  const getAddress = () => {
    if (locale === "ko") return SITE_CONFIG.address.ko
    if (locale === "zh") return SITE_CONFIG.address.zh
    if (locale === "tl") return SITE_CONFIG.address.tl
    return SITE_CONFIG.address.en
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-stone-50 to-amber-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-6">
          <h1
            className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-stone-100 mb-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {locale === "ko" ? "명함" : locale === "zh" ? "名片" : locale === "tl" ? "Business Card" : "Business Card"}
          </h1>
          <p className="text-sm text-stone-500">
            {locale === "ko" ? "QR 코드를 스캔하여 웹사이트를 방문하세요" :
              locale === "zh" ? "扫描二维码访问网站" :
              locale === "tl" ? "I-scan ang QR code para bumisita sa website" :
              "Scan the QR code to visit the website"}
          </p>
        </div>

        {/* Business Card */}
        <Card className="overflow-hidden rounded-3xl shadow-2xl border-2 border-rose-200 dark:border-rose-900 bg-white dark:bg-stone-900">
          {/* Top section with logo */}
          <div className="bg-gradient-to-br from-rose-50 to-amber-50 dark:from-stone-800 dark:to-stone-900 p-8 text-center border-b border-rose-100 dark:border-stone-800">
            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden ring-4 ring-rose-300/50 mb-4">
              <img
                src={SITE_CONFIG.logoPath}
                alt="ELL's Nail Diary"
                className="w-full h-full object-cover"
              />
            </div>
            <h2
              className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              ELL's
            </h2>
            <div className="text-xs text-rose-500 tracking-[0.3em] uppercase mb-1">
              Nail Diary
            </div>
            <p className="text-sm text-stone-500 italic" style={{ fontFamily: "var(--font-playfair)" }}>
              {SITE_CONFIG.tagline}
            </p>
          </div>

          {/* Artist info */}
          <div className="p-6 space-y-3">
            <div className="text-center mb-4">
              <p className="text-sm text-stone-400 uppercase tracking-wide">
                {locale === "ko" ? "네일 아티스트" : locale === "zh" ? "美甲师" : locale === "tl" ? "Nail Artist" : "Nail Artist"}
              </p>
              <p
                className="text-lg font-semibold text-stone-800 dark:text-stone-100"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {SITE_CONFIG.artistName}
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-2 text-sm">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-3 text-stone-600 dark:text-stone-300 hover:text-rose-500 transition-colors"
              >
                <Phone className="h-4 w-4 text-rose-400 flex-shrink-0" />
                <span dir="ltr">{SITE_CONFIG.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-3 text-stone-600 dark:text-stone-300 hover:text-rose-500 transition-colors"
              >
                <Mail className="h-4 w-4 text-rose-400 flex-shrink-0" />
                <span className="text-xs">{SITE_CONFIG.email}</span>
              </a>
              <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
                <MapPin className="h-4 w-4 text-rose-400 flex-shrink-0" />
                <span>{getAddress()}</span>
              </div>
              <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
                <Clock className="h-4 w-4 text-rose-400 flex-shrink-0" />
                <span>{getHours()}</span>
              </div>
            </div>

            {/* QR Code section — large and prominent */}
            <div className="pt-4 mt-4 border-t border-rose-100 dark:border-stone-800">
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-white rounded-2xl shadow-md">
                  <QRCodeSVG
                    value={websiteUrl}
                    size={180}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#1c1917"
                    includeMargin={true}
                  />
                </div>
                <p className="text-xs text-stone-400 text-center">
                  {locale === "ko" ? "스캔하여 웹사이트 방문" :
                    locale === "zh" ? "扫描访问网站" :
                    locale === "tl" ? "I-scan para bumisita" :
                    "Scan to visit website"}
                </p>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex justify-center gap-3 pt-3">
              <a
                href={SITE_CONFIG.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-rose-400 flex items-center justify-center transition-colors"
              >
                <Facebook className="h-4 w-4 text-stone-600 dark:text-stone-300" />
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-rose-400 flex items-center justify-center transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-stone-600 dark:text-stone-300" />
              </a>
            </div>
          </div>
        </Card>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6 justify-center">
          <Button
            variant="outline"
            className="rounded-full border-rose-300 hover:bg-rose-50"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 me-2" />
            {locale === "ko" ? "스크린샷 저장" :
              locale === "zh" ? "截图保存" :
              locale === "tl" ? "I-save" :
              "Save"}
          </Button>
          <a href="/" className="inline-flex">
            <Button className="bg-rose-400 hover:bg-rose-500 text-white rounded-full">
              {locale === "ko" ? "홈으로" : locale === "zh" ? "返回首页" : locale === "tl" ? "Bumalik" : "Back to Home"}
            </Button>
          </a>
        </div>
      </motion.div>
    </div>
  )
}
