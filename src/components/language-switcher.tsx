"use client"

import { useI18n } from "@/i18n/provider"
import { LOCALES } from "@/i18n/messages"
import { Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  const current = LOCALES.find(l => l.code === locale) || LOCALES[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 px-3">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{current.flag}</span>
          <span className="text-xs font-medium">{current.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {LOCALES.map(l => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLocale(l.code)}
            className={`gap-2 cursor-pointer ${locale === l.code ? "bg-rose-50 dark:bg-rose-950/20" : ""}`}
          >
            <span className="text-base">{l.flag}</span>
            <span className="flex-1">{l.label}</span>
            {locale === l.code && <span className="text-rose-500">●</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
