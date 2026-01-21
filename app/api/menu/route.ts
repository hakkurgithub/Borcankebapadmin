import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function GET() {
  try {
    const products = await prisma.product.findMany({ orderBy: { name: 'asc' } });
    const fixed = products.map(p => ({ ...p, price: Number(p.price) }));
    return NextResponse.json(fixed);
  } catch (error) { return NextResponse.json({ error: 'DB Error' }, { status: 500 }); }
}
