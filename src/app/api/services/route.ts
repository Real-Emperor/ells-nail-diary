import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const { db } = await import("@/lib/db")
    const services = await db.siteContent.findMany({
      where: { key: { startsWith: "service_" } },
    })
    const priceMap: Record<string, number> = {}
    for (const s of services) {
      priceMap[s.key.replace("service_", "")] = Number(s.value)
    }
    return NextResponse.json({ prices: priceMap })
  } catch (error) {
    console.error("GET /api/services error:", error)
    return NextResponse.json({ prices: {} })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await import("@/lib/db")
    const { prices } = await request.json()
    if (!prices || typeof prices !== "object") {
      return NextResponse.json({ error: "Prices object required" }, { status: 400 })
    }
    for (const [key, value] of Object.entries(prices)) {
      const dbKey = `service_${key}`
      await db.siteContent.upsert({
        where: { key: dbKey },
        update: { value: String(value) },
        create: { key: dbKey, value: String(value) },
      })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("PUT /api/services error:", error)
    return NextResponse.json({ error: "Failed to update prices" }, { status: 500 })
  }
}
