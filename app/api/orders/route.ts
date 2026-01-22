import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // @ts-ignore
    const order = await prisma.orders.create({
      data: {
        userEmail: body.email || "misafir",
        total: Number(body.total),
        status: "Beklemede",
        items: JSON.stringify(body.items)
      }
    })
    return NextResponse.json({ success: true, data: order })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Bağlantı hatası" }, { status: 500 })
  }
}
