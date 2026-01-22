import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // HATA DÜZELTİLDİ: 'product' yerine 'products' kullanıldı
    const products = await prisma.products.findMany({
      orderBy: { name: 'asc' },
    });

    const fixedProducts = products.map(p => ({
      ...p,
      price: p.price ? Number(p.price) : 0,
    }));

    return NextResponse.json(fixedProducts);
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    return NextResponse.json({ error: 'Veritabanı hatası' }, { status: 500 });
  }
}