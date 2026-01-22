import { NextRequest, NextResponse } from 'next/server'
import { createReservation, getAllReservations } from '../../../lib/products'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const reservations = await getAllReservations()
    return NextResponse.json({ success: true, data: reservations })
  } catch (error) {
    console.error('Reservations GET Error:', error)
    return NextResponse.json({ success: false, error: 'Rezervasyonlar alınırken bir hata oluştu' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerName, customerPhone, customerEmail, reservationDate, partySize, notes } = body
    
    if (!customerName || !customerPhone || !reservationDate || !partySize) {
      return NextResponse.json({ success: false, error: 'Ad, telefon, tarih ve kişi sayısı gereklidir' }, { status: 400 })
    }
    
    const reservationDateTime = new Date(reservationDate)
    
    // DÜZELTME: Veritabanı modelinizdeki (lib/products içindeki) isimlere göre eşleme yapıldı
    const reservation = await createReservation({
      name: customerName,
      phone: customerPhone,
      date: reservationDateTime, // Tarih nesnesi
      time: reservationDateTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }), // Saati ayırıyoruz
      guests: parseInt(partySize),
      message: notes || ""
    })
    
    return NextResponse.json({
      success: true,
      data: reservation,
      message: 'Rezervasyon başarıyla oluşturuldu'
    })
    
  } catch (error) {
    console.error('Reservations POST Error:', error)
    return NextResponse.json({ success: false, error: 'Rezervasyon oluşturulurken bir hata oluştu' }, { status: 500 })
  }
}