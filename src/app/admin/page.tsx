"use client"

import { useState, useEffect } from "react"
import { useI18n } from "@/i18n/provider"
import { SITE_CONFIG, SERVICE_CATEGORIES, getWhatsAppLink } from "@/lib/site-config"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Lock, LogOut, Save, Eye, Phone, Mail, MapPin, Clock,
  Image as ImageIcon, Plus, Trash2, Edit, ExternalLink, QrCode,
} from "lucide-react"
import { toast } from "sonner"

// Admin credentials (client-side only — for demo purposes)
const ADMIN_PASSWORD = "ELLAdmin2026!"

// LocalStorage keys
const LS_KEYS = {
  content: "ell-admin-content",
  gallery: "ell-admin-gallery",
  auth: "ell-admin-auth",
}

// Default content from site-config
const DEFAULT_CONTENT = {
  brandName: SITE_CONFIG.brandName,
  tagline: SITE_CONFIG.tagline,
  artistName: SITE_CONFIG.artistName,
  phone: SITE_CONFIG.phone,
  phoneDisplay: SITE_CONFIG.phoneDisplay,
  email: SITE_CONFIG.email,
  facebook: SITE_CONFIG.facebook,
  hoursEn: SITE_CONFIG.hours.en,
  hoursKo: SITE_CONFIG.hours.ko,
  hoursZh: SITE_CONFIG.hours.zh,
  hoursTl: SITE_CONFIG.hours.tl,
  addressEn: SITE_CONFIG.address.en,
  addressKo: SITE_CONFIG.address.ko,
  addressZh: SITE_CONFIG.address.zh,
  addressTl: SITE_CONFIG.address.tl,
}

export default function AdminPage() {
  const { t, locale, setLocale } = useI18n()
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState(DEFAULT_CONTENT)
  const [gallery, setGallery] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("content")

  useEffect(() => {
    const auth = localStorage.getItem(LS_KEYS.auth)
    if (auth === "true") setAuthed(true)

    // Load saved content
    const savedContent = localStorage.getItem(LS_KEYS.content)
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent))
      } catch {}
    }

    // Load saved gallery
    const savedGallery = localStorage.getItem(LS_KEYS.gallery)
    if (savedGallery) {
      try {
        setGallery(JSON.parse(savedGallery))
      } catch {}
    }

    setLoading(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthed(true)
      localStorage.setItem(LS_KEYS.auth, "true")
      toast.success("Login successful")
    } else {
      toast.error("Invalid password")
    }
  }

  const handleLogout = () => {
    setAuthed(false)
    localStorage.removeItem(LS_KEYS.auth)
    setPassword("")
  }

  const handleSaveContent = () => {
    localStorage.setItem(LS_KEYS.content, JSON.stringify(content))
    toast.success("Content saved successfully")
  }

  const handleAddGalleryImage = (url: string) => {
    if (!url) return
    setGallery([...gallery, url])
    localStorage.setItem(LS_KEYS.gallery, JSON.stringify([...gallery, url]))
    toast.success("Image added to gallery")
  }

  const handleRemoveGalleryImage = (index: number) => {
    const updated = gallery.filter((_, i) => i !== index)
    setGallery(updated)
    localStorage.setItem(LS_KEYS.gallery, JSON.stringify(updated))
    toast.success("Image removed")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-stone-400">Loading...</div>
      </div>
    )
  }

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-amber-50 dark:from-stone-950 dark:to-stone-900 p-4">
        <Card className="max-w-md w-full p-8 rounded-3xl shadow-xl border-rose-200 dark:border-stone-800">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-rose-300/50 mb-3">
              <img src={SITE_CONFIG.logoPath} alt="ELL's Nail Diary" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100" style={{ fontFamily: "var(--font-playfair)" }}>
              Admin Login
            </h1>
            <p className="text-sm text-stone-500 mt-1">ELL's Nail Diary — Content Management</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password" className="flex items-center gap-2 mb-1.5">
                <Lock className="h-4 w-4 text-rose-400" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl border-rose-200 dark:border-stone-700"
                placeholder="Enter admin password"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-rose-400 hover:bg-rose-500 text-white rounded-full"
            >
              Sign In
            </Button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className="text-xs text-stone-400 hover:text-rose-400">
              ← Back to website
            </a>
          </div>
        </Card>
      </div>
    )
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-rose-300/50">
              <img src={SITE_CONFIG.logoPath} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-stone-800 dark:text-stone-100" style={{ fontFamily: "var(--font-playfair)" }}>
                ELL's Nail Diary
              </h1>
              <p className="text-xs text-stone-400">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <a href="/" target="_blank" className="hidden sm:inline-flex">
              <Button variant="outline" size="sm" className="rounded-full">
                <ExternalLink className="h-4 w-4 me-1" />
                View Site
              </Button>
            </a>
            <a href="/business-card" target="_blank" className="hidden sm:inline-flex">
              <Button variant="outline" size="sm" className="rounded-full">
                <QrCode className="h-4 w-4 me-1" />
                Business Card
              </Button>
            </a>
            <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-full text-red-500 hover:text-red-600">
              <LogOut className="h-4 w-4 me-1" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="content" className="rounded-full">Content</TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-full">Gallery</TabsTrigger>
            <TabsTrigger value="services" className="rounded-full">Services</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-full">Settings</TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content">
            <Card className="p-6 rounded-2xl border-rose-100 dark:border-stone-800">
              <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Website Content
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-1.5 block">Brand Name</Label>
                  <Input
                    value={content.brandName}
                    onChange={(e) => setContent({ ...content, brandName: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block">Tagline</Label>
                  <Input
                    value={content.tagline}
                    onChange={(e) => setContent({ ...content, tagline: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block">Artist Name</Label>
                  <Input
                    value={content.artistName}
                    onChange={(e) => setContent({ ...content, artistName: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block">Phone (for dialing)</Label>
                  <Input
                    value={content.phone}
                    onChange={(e) => setContent({ ...content, phone: e.target.value })}
                    className="rounded-xl"
                    dir="ltr"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block">Phone (display)</Label>
                  <Input
                    value={content.phoneDisplay}
                    onChange={(e) => setContent({ ...content, phoneDisplay: e.target.value })}
                    className="rounded-xl"
                    dir="ltr"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block">Email</Label>
                  <Input
                    value={content.email}
                    onChange={(e) => setContent({ ...content, email: e.target.value })}
                    className="rounded-xl"
                    dir="ltr"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="mb-1.5 block">Facebook URL</Label>
                  <Input
                    value={content.facebook}
                    onChange={(e) => setContent({ ...content, facebook: e.target.value })}
                    className="rounded-xl"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Hours by language */}
              <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-200 mt-6 mb-3">Working Hours (by language)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-1.5 block">Hours (English)</Label>
                  <Input value={content.hoursEn} onChange={(e) => setContent({ ...content, hoursEn: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Hours (Korean)</Label>
                  <Input value={content.hoursKo} onChange={(e) => setContent({ ...content, hoursKo: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Hours (Chinese)</Label>
                  <Input value={content.hoursZh} onChange={(e) => setContent({ ...content, hoursZh: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Hours (Filipino)</Label>
                  <Input value={content.hoursTl} onChange={(e) => setContent({ ...content, hoursTl: e.target.value })} className="rounded-xl" />
                </div>
              </div>

              {/* Address by language */}
              <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-200 mt-6 mb-3">Address (by language)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-1.5 block">Address (English)</Label>
                  <Input value={content.addressEn} onChange={(e) => setContent({ ...content, addressEn: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Address (Korean)</Label>
                  <Input value={content.addressKo} onChange={(e) => setContent({ ...content, addressKo: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Address (Chinese)</Label>
                  <Input value={content.addressZh} onChange={(e) => setContent({ ...content, addressZh: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Address (Filipino)</Label>
                  <Input value={content.addressTl} onChange={(e) => setContent({ ...content, addressTl: e.target.value })} className="rounded-xl" />
                </div>
              </div>

              <div className="mt-6">
                <Button onClick={handleSaveContent} className="bg-rose-400 hover:bg-rose-500 text-white rounded-full">
                  <Save className="h-4 w-4 me-2" />
                  Save Content
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <Card className="p-6 rounded-2xl border-rose-100 dark:border-stone-800">
              <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Gallery Management
              </h2>

              {/* Add new image */}
              <div className="mb-6 p-4 bg-rose-50/50 dark:bg-stone-900/50 rounded-2xl">
                <Label className="mb-1.5 block">Add Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="gallery-url"
                    placeholder="https://example.com/nail-art.jpg"
                    className="rounded-xl"
                    dir="ltr"
                  />
                  <Button
                    onClick={() => {
                      const input = document.getElementById("gallery-url") as HTMLInputElement
                      if (input?.value) {
                        handleAddGalleryImage(input.value)
                        input.value = ""
                      }
                    }}
                    className="bg-rose-400 hover:bg-rose-500 text-white rounded-xl whitespace-nowrap"
                  >
                    <Plus className="h-4 w-4 me-1" />
                    Add
                  </Button>
                </div>
              </div>

              {/* Gallery preview */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Current gallery images from public folder */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={`default-${i}`} className="relative aspect-square rounded-xl overflow-hidden group">
                    <img
                      src={`/gallery/gallery-${i + 1}.jpg`}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/gallery/gallery-1.jpg"
                      }}
                    />
                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-all flex items-center justify-center">
                      <Badge className="bg-rose-400 text-white">Default</Badge>
                    </div>
                  </div>
                ))}

                {/* User-added gallery images */}
                {gallery.map((url, i) => (
                  <div key={`user-${i}`} className="relative aspect-square rounded-xl overflow-hidden group">
                    <img src={url} alt={`Custom ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleRemoveGalleryImage(i)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-green-500 text-white text-xs">Custom</Badge>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-stone-400 mt-4">
                Default images are loaded from the gallery folder. To add custom images, paste the URL above.
              </p>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <Card className="p-6 rounded-2xl border-rose-100 dark:border-stone-800">
              <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Services & Pricing
              </h2>
              <p className="text-sm text-stone-400 mb-6">
                Service prices are configured in the code. Contact your developer to modify pricing.
              </p>

              <div className="space-y-6">
                {SERVICE_CATEGORIES.map((cat) => (
                  <div key={cat.categoryKey} className="p-4 bg-stone-50 dark:bg-stone-900/50 rounded-2xl">
                    <h3 className="text-lg font-semibold text-rose-500 mb-3">
                      {t.services.categories[cat.categoryKey]}
                    </h3>
                    <div className="space-y-2">
                      {cat.items.map((item: any) => {
                        const label = t.services.items[item.key as keyof typeof t.services.items]
                        let priceText = ""
                        if (item.price !== undefined) {
                          priceText = `₱${item.price}`
                        } else if (item.priceFrom !== undefined) {
                          priceText = item.priceTo
                            ? `₱${item.priceFrom} - ₱${item.priceTo}`
                            : `from ₱${item.priceFrom}`
                        }
                        return (
                          <div key={item.key} className="flex items-center justify-between text-sm py-2 border-b border-stone-100 dark:border-stone-800 last:border-0">
                            <span className="text-stone-600 dark:text-stone-300">
                              {label}
                              {(cat as any).perNail && (
                                <span className="text-xs text-stone-400 ml-1">(per nail)</span>
                              )}
                            </span>
                            <span className="font-semibold text-rose-500">{priceText}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="p-6 rounded-2xl border-rose-100 dark:border-stone-800">
              <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Settings
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-rose-50/50 dark:bg-stone-900/50 rounded-2xl">
                  <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">Admin Password</h3>
                  <p className="text-xs text-stone-400 mb-3">
                    Current password is set in the code. Contact your developer to change it.
                  </p>
                  <Badge className="bg-rose-100 text-rose-500">Password: ELLAdmin2026!</Badge>
                </div>

                <div className="p-4 bg-rose-50/50 dark:bg-stone-900/50 rounded-2xl">
                  <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">Quick Links</h3>
                  <div className="flex flex-wrap gap-2">
                    <a href="/" target="_blank">
                      <Button variant="outline" size="sm" className="rounded-full">
                        <ExternalLink className="h-3 w-3 me-1" /> Website
                      </Button>
                    </a>
                    <a href="/business-card" target="_blank">
                      <Button variant="outline" size="sm" className="rounded-full">
                        <QrCode className="h-3 w-3 me-1" /> Business Card
                      </Button>
                    </a>
                    <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank">
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Phone className="h-3 w-3 me-1" /> WhatsApp
                      </Button>
                    </a>
                    <a href={SITE_CONFIG.facebook} target="_blank">
                      <Button variant="outline" size="sm" className="rounded-full">
                        <ExternalLink className="h-3 w-3 me-1" /> Facebook
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 dark:bg-stone-900/50 rounded-2xl">
                  <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">Reset Content</h3>
                  <p className="text-xs text-stone-400 mb-3">
                    This will reset all custom content to the default values.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-red-500 hover:text-red-600"
                    onClick={() => {
                      localStorage.removeItem(LS_KEYS.content)
                      localStorage.removeItem(LS_KEYS.gallery)
                      setContent(DEFAULT_CONTENT)
                      setGallery([])
                      toast.success("Content reset to defaults")
                    }}
                  >
                    <Trash2 className="h-4 w-4 me-1" />
                    Reset to Defaults
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
