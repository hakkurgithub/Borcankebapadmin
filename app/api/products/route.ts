import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

// 1. ÜRÜNLERİ GETİR
export async function GET() {
  try {
    const products = await prisma.products.findMany({
      orderBy: { id: 'desc' }
    });
    
    // Veritabanındaki is_active (1 veya 0) değerini, ön yüzün anladığı true/false (Aktif/Pasif) diline çeviriyoruz
    const formattedProducts = products.map((p: any) => ({
      ...p,
      isActive: p.is_active === 1,
      price: Number(p.price)
    }));
    
    return NextResponse.json(formattedProducts);
  } catch (error) {
    return NextResponse.json({ error: 'Ürünler alınamadı' }, { status: 500 });
  }
}

// 2. YENİ ÜRÜN EKLE
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, price, image, isActive } = body;

    const newProduct = await prisma.products.create({
      data: {
        name,
        price: parseFloat(price),
        image: image || null,
        is_active: isActive === false ? 0 : 1, // Pasifse 0, Aktifse 1 kaydet
      }
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Ürün eklenemedi' }, { status: 500 });
  }
}

// 3. ÜRÜNÜ GÜNCELLE
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, price, isActive, image } = body;

    if (!id) return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });

    const updatedProduct = await prisma.products.update({
      where: { id: Number(id) },
      data: {
        name,
        price: parseFloat(price),
        image: image || null,
        is_active: isActive === false ? 0 : 1,
      }
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: 'Ürün güncellenemedi' }, { status: 500 });
  }
}

// 4. ÜRÜNÜ SİL
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });

    await prisma.products.delete({
      where: { id: Number(id) }
    });
    return NextResponse.json({ message: 'Ürün silindi' });
  } catch (error) {
    return NextResponse.json({ error: 'Ürün silinemedi' }, { status: 500 });
  }
}