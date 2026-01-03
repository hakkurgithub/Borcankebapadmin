'use client';

import { useState } from 'react';

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    note: ''
  });

  const handleWhatsAppReservation = (e: React.FormEvent) => {
    e.preventDefault();
    
    const mesaj = `Merhaba Borcan Kebap,%0A%0A` +
                  `*Yeni Rezervasyon Talebi*%0A` +
                  `--------------------------%0A` +
                  `*İsim:* ${formData.name}%0A` +
                  `*Telefon:* ${formData.phone}%0A` +
                  `*Tarih:* ${formData.date}%0A` +
                  `*Saat:* ${formData.time}%0A` +
                  `*Kişi Sayısı:* ${formData.guests}%0A` +
                  `*Not:* ${formData.note || 'Yok'}%0A%0A` +
                  `Onay bekliyorum.`;

    window.open(`https://wa.me/905455093462?text=${mesaj}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h1 className="text-3xl font-bold text-center mb-8 text-red-600">Masa Rezervasyonu</h1>
          <form onSubmit={handleWhatsAppReservation} className="space-y-4">
            <input type="text" placeholder="Ad Soyad" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" onChange={(e)=>setFormData({...formData, name: e.target.value})} />
            <input type="tel" placeholder="Telefon (05xx...)" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" onChange={(e)=>setFormData({...formData, phone: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" onChange={(e)=>setFormData({...formData, date: e.target.value})} />
              <input type="time" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" onChange={(e)=>setFormData({...formData, time: e.target.value})} />
            </div>
            <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" onChange={(e)=>setFormData({...formData, guests: e.target.value})}>
              {[1,2,3,4,5,6,8,10,15,20].map(n => <option key={n} value={n}>{n} Kişi</option>)}
            </select>
            <textarea placeholder="Özel istekleriniz (isteğe bağlı)..." className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-red-500 outline-none" onChange={(e)=>setFormData({...formData, note: e.target.value})}></textarea>
            <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-lg font-bold hover:bg-red-700 transition-all transform active:scale-95 shadow-lg">
              WhatsApp ile Rezervasyon Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
