import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// GET — list all gallery images
export async function GET() {
  try {
    const { db } = await import("@/lib/db")
    const images = await db.galleryImage.findMany({
      orderBy: { sortOrder: "asc" },
    })
    return NextResponse.json({ images })
  } catch (error) {
    console.error("GET /api/gallery error:", error)
    return NextResponse.json({ images: [] })
  }
}

// POST — upload a new gallery image
export async function POST(request: NextRequest) {
  try {
    const { db } = await import("@/lib/db")
    const { imageData, alt } = await request.json()
    if (!imageData) {
      return NextResponse.json({ error: "Image data required" }, { status: 400 })
    }

    const lastImage = await db.galleryImage.findFirst({
      orderBy: { sortOrder: "desc" },
    })
    const sortOrder = (lastImage?.sortOrder || 0) + 1

    const image = await db.galleryImage.create({
      data: { url: imageData, alt: alt || "", sortOrder },
    })

    return NextResponse.json({ success: true, image })
  } catch (error) {
    console.error("POST /api/gallery error:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}

// DELETE — delete a gallery image
export async function DELETE(request: NextRequest) {
  try {
    const { db } = await import("@/lib/db")
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: "Image ID required" }, { status: 400 })
    }
    await db.galleryImage.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE /api/gallery error:", error)
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 })
  }
}
