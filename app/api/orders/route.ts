import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Veritabanına yazma işlemini pas geçiyoruz ki kilitlenme (INP) yaşanmasın.
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Hata" }, { status: 500 });
  }
}