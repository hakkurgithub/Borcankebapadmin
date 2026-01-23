import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // @ts-ignore
    await (prisma as any).orders.create({
      data: {
        email: body.email || "misafir",
        total: Number(body.total),
        status: "Beklemede",
        items: JSON.stringify(body.items)
      }
    })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Hata" }, { status: 500 })
  }
}
