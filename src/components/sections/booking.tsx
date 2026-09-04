"use client"

import { useState } from "react"
import { useI18n } from "@/i18n/provider"
import { SITE_CONFIG, SERVICE_CATEGORIES, getWhatsAppLink } from "@/lib/site-config"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Clock, User, Phone, MessageCircle, Send } from "lucide-react"
import { toast } from "sonner"

export function BookingSection() {
  const { t, locale } = useI18n()
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    notes: "",
  })
  const [submitting, setSubmitting] = useState(false)

  // Flatten all services for the dropdown
  const allServices = SERVICE_CATEGORIES.flatMap(cat =>
    cat.items.map(item => ({
      key: item.key,
      label: t.services.items[item.key as keyof typeof t.services.items],
      category: t.services.categories[cat.categoryKey],
    }))
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.date || !form.time || !form.service) {
      toast.error("Please fill in all required fields")
      return
    }

    setSubmitting(true)

    // Build WhatsApp message
    const selectedService = allServices.find(s => s.key === form.service)
    const msgLines = [
      `*${t.whatsapp.message}*`,
      ``,
      `${t.booking.name}: ${form.name}`,
      `${t.booking.phone}: ${form.phone}`,
      `${t.booking.date}: ${form.date}`,
      `${t.booking.time}: ${form.time}`,
      `${t.booking.service}: ${selectedService ? selectedService.label : form.service}`,
    ]
    if (form.notes) {
      msgLines.push(`${t.booking.notes}: ${form.notes}`)
    }

    const whatsappUrl = getWhatsAppLink(msgLines.join("\n"))

    toast.success(t.booking.success)

    // Open WhatsApp after a short delay
    setTimeout(() => {
      window.open(whatsappUrl, "_blank")
      setSubmitting(false)
      setForm({ name: "", phone: "", date: "", time: "", service: "", notes: "" })
    }, 1000)
  }

  // Get tomorrow's date as minimum
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  return (
    <section id="booking" className="py-20 md:py-28 bg-gradient-to-b from-white via-rose-50/30 to-rose-100/20 dark:from-stone-950 dark:via-stone-900/30 dark:to-stone-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-rose-100 dark:bg-rose-950/30 text-rose-500 text-sm font-medium tracking-wide">
            ✦ {t.booking.title} ✦
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 dark:text-stone-100 mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t.booking.title}
          </h2>
          <p className="text-base md:text-lg text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
            {t.booking.subtitle}
          </p>
        </motion.div>

        {/* Booking form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="p-6 md:p-8 border-rose-100 dark:border-stone-800 rounded-3xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5 flex items-center gap-2">
                  <User className="h-4 w-4 text-rose-400" />
                  {t.booking.name} *
                </Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="rounded-xl border-rose-100 dark:border-stone-700 focus:border-rose-400"
                  placeholder="..."
                />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-rose-400" />
                  {t.booking.phone} *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="rounded-xl border-rose-100 dark:border-stone-700 focus:border-rose-400"
                  placeholder="+63 ..."
                  dir="ltr"
                />
              </div>

              {/* Date & Time row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-rose-400" />
                    {t.booking.date} *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={form.date}
                    min={minDate}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                    className="rounded-xl border-rose-100 dark:border-stone-700 focus:border-rose-400"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-rose-400" />
                    {t.booking.time} *
                  </Label>
                  <Select
                    value={form.time}
                    onValueChange={(v) => setForm({ ...form, time: v })}
                  >
                    <SelectTrigger id="time" className="rounded-xl border-rose-100 dark:border-stone-700">
                      <SelectValue placeholder={t.booking.selectTime} />
                    </SelectTrigger>
                    <SelectContent>
                      {t.booking.timeSlots.map(slot => (
                        <SelectItem key={slot} value={slot} className="cursor-pointer">
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Service */}
              <div>
                <Label htmlFor="service" className="text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-rose-400" />
                  {t.booking.service} *
                </Label>
                <Select
                  value={form.service}
                  onValueChange={(v) => setForm({ ...form, service: v })}
                >
                  <SelectTrigger id="service" className="rounded-xl border-rose-100 dark:border-stone-700">
                    <SelectValue placeholder={t.booking.selectService} />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {SERVICE_CATEGORIES.map(cat => (
                      <div key={cat.categoryKey}>
                        <div className="px-3 py-1.5 text-xs font-semibold text-rose-500 uppercase tracking-wide bg-rose-50/50 dark:bg-rose-950/20">
                          {t.services.categories[cat.categoryKey]}
                        </div>
                        {cat.items.map(item => (
                          <SelectItem
                            key={item.key}
                            value={item.key}
                            className="cursor-pointer"
                          >
                            {t.services.items[item.key as keyof typeof t.services.items]}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes" className="text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5 block">
                  {t.booking.notes}
                </Label>
                <Textarea
                  id="notes"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="rounded-xl border-rose-100 dark:border-stone-700 focus:border-rose-400 min-h-[80px]"
                  placeholder="..."
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-rose-400 hover:bg-rose-500 text-white rounded-full py-6 text-base shadow-md hover:shadow-lg transition-all disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full me-2" />
                    {t.booking.success}
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 me-2" />
                    {t.booking.submit}
                  </>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
