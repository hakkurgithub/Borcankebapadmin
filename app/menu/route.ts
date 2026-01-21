// app/api/menu/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma'; // Yolunuzu kontrol edin

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { name: 'asc' },
    });

    const fixed = products.map(p => ({
      ...p,
      price: Number(p.price),
    }));

    return NextResponse.json(fixed);
  } catch (error) {
    console.error("API Hatası:", error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}