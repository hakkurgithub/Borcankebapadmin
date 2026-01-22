import { NextRequest, NextResponse } from 'next/server'
import { getAllProducts } from '../../../lib/products'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const products = await getAllProducts()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Ürünler alınamadı' }, { status: 500 })
  }
}
