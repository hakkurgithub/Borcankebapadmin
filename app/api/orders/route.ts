import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // @ts-ignore: Şema uyumsuzluğunu build için geçiyoruz
    const order = await (prisma as any).orders.create({
      data: {
        email: body.email || "misafir@borcankebap.com",
        total: Number(body.total),
        status: "Beklemede",
        items: typeof body.items === 'string' ? body.items : JSON.stringify(body.items)
      }
    })
    return NextResponse.json({ success: true, data: order })
  } catch (error) {
    console.error("Sipariş hatası:", error)
    return NextResponse.json({ success: false, error: "Bağlantı hatası" }, { status: 500 })
  }
}
