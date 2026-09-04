"use client"

import { useState, useEffect, useCallback } from "react"
import { useI18n } from "@/i18n/provider"
import { SITE_CONFIG, SERVICE_CATEGORIES, formatPrice } from "@/lib/site-config"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Lock, LogOut, Save, Phone, Mail, Plus, Trash2, Edit, ExternalLink, QrCode,
  Upload, Image as ImageIcon, Loader2,
} from "lucide-react"
import { toast } from "sonner"

const ADMIN_PASSWORD = "ELLAdmin2026!"

export default function AdminPage() {
  const { t, locale, setLocale } = useI18n()
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(true)

  // Content state
  const [content, setContent] = useState({
    brandName: SITE_CONFIG.brandName,
    tagline: SITE_CONFIG.tagline,
    artistName: SITE_CONFIG.artistName,
    phone: SITE_CONFIG.phone,
    phoneDisplay: SITE_CONFIG.phoneDisplay,
    email: SITE_CONFIG.email,
    facebook: SITE_CONFIG.facebook,
  })

  // Gallery state
  const [galleryImages, setGalleryImages] = useState<any[]>([])
  const [galleryLoading, setGalleryLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Services state
  const [prices, setPrices] = useState<Record<string, number>>({})
  const [pricesLoading, setPricesLoading] = useState(false)

  const [activeTab, setActiveTab] = useState("content")

  // Auth check
  useEffect(() => {
    const auth = sessionStorage.getItem("ell-admin-auth")
    if (auth === "true") setAuthed(true)
    setLoading(false)
  }, [])

  // Fetch gallery images from DB
  const fetchGallery = useCallback(async () => {
    setGalleryLoading(true)
    try {
      const res = await fetch("/api/gallery")
      const data = await res.json()
      setGalleryImages(data.images || [])
    } catch (e) {
      console.error("Failed to fetch gallery:", e)
    }
    setGalleryLoading(false)
  }, [])

  // Fetch service prices from DB
  const fetchPrices = useCallback(async () => {
    setPricesLoading(true)
    try {
      const res = await fetch("/api/services")
      const data = await res.json()
      setPrices(data.prices || {})
    } catch (e) {
      console.error("Failed to fetch prices:", e)
    }
    setPricesLoading(false)
  }, [])

  useEffect(() => {
    if (authed) {
      fetchGallery()
      fetchPrices()
    }
  }, [authed, fetchGallery, fetchPrices])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthed(true)
      sessionStorage.setItem("ell-admin-auth", "true")
      toast.success("Login successful")
    } else {
      toast.error("Invalid password")
    }
  }

  const handleLogout = () => {
    setAuthed(false)
    sessionStorage.removeItem("ell-admin-auth")
    setPassword("")
  }

  // Save content to DB
  const handleSaveContent = async () => {
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })
      if (res.ok) {
        toast.success("Content saved successfully")
      } else {
        toast.error("Failed to save content")
      }
    } catch {
      toast.error("Failed to save content")
    }
  }

  // Upload gallery image
  const handleUploadImage = async (file: File) => {
    setUploading(true)
    try {
      // Compress and convert to base64
      const reader = new FileReader()
      reader.onload = async (e) => {
        const img = new Image()
        img.onload = async () => {
          const SIZE = 800
          const canvas = document.createElement("canvas")
          canvas.width = SIZE
          canvas.height = SIZE
          const ctx = canvas.getContext("2d")
          if (!ctx) return
          const minDim = Math.min(img.width, img.height)
          const sx = (img.width - minDim) / 2
          const sy = (img.height - minDim) / 2
          ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, SIZE, SIZE)
          const compressed = canvas.toDataURL("image/jpeg", 0.85)

          const res = await fetch("/api/gallery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageData: compressed, alt: file.name }),
          })
          if (res.ok) {
            toast.success("Image uploaded successfully")
            fetchGallery()
          } else {
            toast.error("Failed to upload image")
          }
          setUploading(false)
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    } catch (e) {
      toast.error("Failed to upload image")
      setUploading(false)
    }
  }

  // Delete gallery image
  const handleDeleteImage = async (id: string) => {
    try {
      const res = await fetch("/api/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        toast.success("Image deleted")
        fetchGallery()
      } else {
        toast.error("Failed to delete image")
      }
    } catch {
      toast.error("Failed to delete image")
    }
  }

  // Save prices
  const handleSavePrices = async () => {
    try {
      const res = await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prices }),
      })
      if (res.ok) {
        toast.success("Prices updated successfully")
      } else {
        toast.error("Failed to update prices")
      }
    } catch {
      toast.error("Failed to update prices")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-stone-400">Loading...</div>
      </div>
    )
  }

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
            <Button type="submit" className="w-full bg-rose-400 hover:bg-rose-500 text-white rounded-full">
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

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-2">
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
                <ExternalLink className="h-4 w-4 me-1" /> View Site
              </Button>
            </a>
            <a href="/business-card" target="_blank" className="hidden sm:inline-flex">
              <Button variant="outline" size="sm" className="rounded-full">
                <QrCode className="h-4 w-4 me-1" /> Card
              </Button>
            </a>
            <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-full text-red-500 hover:text-red-600">
              <LogOut className="h-4 w-4 me-1" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex flex-wrap">
            <TabsTrigger value="content" className="rounded-full">Content</TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-full">Gallery</TabsTrigger>
            <TabsTrigger value="services" className="rounded-full">Services & Pricing</TabsTrigger>
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
                  <Input value={content.brandName} onChange={(e) => setContent({ ...content, brandName: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Tagline</Label>
                  <Input value={content.tagline} onChange={(e) => setContent({ ...content, tagline: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Artist Name</Label>
                  <Input value={content.artistName} onChange={(e) => setContent({ ...content, artistName: e.target.value })} className="rounded-xl" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Phone (for dialing)</Label>
                  <Input value={content.phone} onChange={(e) => setContent({ ...content, phone: e.target.value })} className="rounded-xl" dir="ltr" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Phone (display)</Label>
                  <Input value={content.phoneDisplay} onChange={(e) => setContent({ ...content, phoneDisplay: e.target.value })} className="rounded-xl" dir="ltr" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Email</Label>
                  <Input value={content.email} onChange={(e) => setContent({ ...content, email: e.target.value })} className="rounded-xl" dir="ltr" />
                </div>
                <div className="md:col-span-2">
                  <Label className="mb-1.5 block">Facebook URL</Label>
                  <Input value={content.facebook} onChange={(e) => setContent({ ...content, facebook: e.target.value })} className="rounded-xl" dir="ltr" />
                </div>
              </div>
              <div className="mt-6">
                <Button onClick={handleSaveContent} className="bg-rose-400 hover:bg-rose-500 text-white rounded-full">
                  <Save className="h-4 w-4 me-2" /> Save Content
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
              <p className="text-sm text-stone-500 mb-4">
                Upload photos from your device. They will be stored in the database and displayed on the website.
              </p>

              {/* Upload area */}
              <div className="mb-6">
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleUploadImage(file)
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-xl border-rose-200 hover:bg-rose-50"
                    disabled={uploading}
                    asChild
                  >
                    <span>
                      {uploading ? (
                        <>
                          <Loader2 className="h-4 w-4 me-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 me-2" />
                          Upload Photo from Device
                        </>
                      )}
                    </span>
                  </Button>
                </label>
              </div>

              {/* Gallery grid */}
              {galleryLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-rose-400" />
                </div>
              ) : galleryImages.length === 0 ? (
                <div className="text-center py-12 text-stone-400">
                  <ImageIcon className="h-12 w-12 mx-auto mb-3" />
                  <p>No photos uploaded yet. Upload your first photo above.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryImages.map((img) => (
                    <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden group">
                      <img src={img.url} alt={img.alt || "Gallery image"} className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleDeleteImage(img.id)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Services Tab — fully editable */}
          <TabsContent value="services">
            <Card className="p-6 rounded-2xl border-rose-100 dark:border-stone-800">
              <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                Services & Pricing
              </h2>
              <p className="text-sm text-stone-500 mb-6">
                Edit prices directly. Changes take effect immediately after saving.
              </p>

              {pricesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-rose-400" />
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    {SERVICE_CATEGORIES.map((cat) => (
                      <div key={cat.categoryKey} className="p-4 bg-stone-50 dark:bg-stone-900/50 rounded-2xl">
                        <h3 className="text-lg font-semibold text-rose-500 mb-3">
                          {t.services.categories[cat.categoryKey]}
                        </h3>
                        <div className="space-y-3">
                          {cat.items.map((item: any) => {
                            const label = t.services.items[item.key as keyof typeof t.services.items]
                            const currentPrice = prices[item.key] || item.price || item.priceFrom || 0
                            return (
                              <div key={item.key} className="flex items-center gap-3">
                                <span className="flex-1 text-sm text-stone-600 dark:text-stone-300">
                                  {label}
                                  {(cat as any).perNail && (
                                    <span className="text-xs text-stone-400 ml-1">(per nail)</span>
                                  )}
                                </span>
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-medium text-rose-500">₱</span>
                                  <Input
                                    type="number"
                                    value={currentPrice}
                                    onChange={(e) => setPrices({ ...prices, [item.key]: Number(e.target.value) })}
                                    className="w-24 rounded-lg border-rose-100 dark:border-stone-700"
                                  />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Button onClick={handleSavePrices} className="bg-rose-400 hover:bg-rose-500 text-white rounded-full">
                      <Save className="h-4 w-4 me-2" /> Save All Prices
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
