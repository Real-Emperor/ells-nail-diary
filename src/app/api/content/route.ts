import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

// GET — get all site content
export async function GET() {
  try {
    const contents = await db.siteContent.findMany()
    const contentMap: Record<string, string> = {}
    for (const c of contents) {
      contentMap[c.key] = c.value
    }
    return NextResponse.json({ content: contentMap })
  } catch (error) {
    console.error("GET /api/content error:", error)
    return NextResponse.json({ content: {} })
  }
}

// PUT — update site content
export async function PUT(request: NextRequest) {
  try {
    const { content } = await request.json()
    if (!content || typeof content !== "object") {
      return NextResponse.json({ error: "Content object required" }, { status: 400 })
    }

    for (const [key, value] of Object.entries(content)) {
      await db.siteContent.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("PUT /api/content error:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}
