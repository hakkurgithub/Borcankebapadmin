'use client';

import { useState } from 'react';
import AdBanner from "../../components/AdBanner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Genel Sorgu',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Tüm alanları içeren profesyonel mesaj formatı
    const mesaj = `Merhaba Borcan Kebap,%0A%0A` +
                  `*Yeni İletişim Formu Mesajı*%0A` +
                  `--------------------------%0A` +
                  `*İsim:* ${formData.name}%0A` +
                  `*E-posta:* ${formData.email}%0A` +
                  `*Telefon:* ${formData.phone}%0A` +
                  `*Konu:* ${formData.subject}%0A` +
                  `*Mesaj:* ${formData.message}%0A%0A` +
                  `Yanıtınızı bekliyorum.`;

    const whatsappUrl = `https://wa.me/905455093462?text=${mesaj}`;
    
    window.open(whatsappUrl, '_blank');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Alanı */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h1 className="text-3xl font-bold mb-6 text-gray-800">Bize Ulaşın</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad *</label>
                    <input type="text" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Adınız" onChange={(e)=>setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-posta *</label>
                    <input type="email" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="E-posta adresiniz" onChange={(e)=>setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon *</label>
                    <input type="tel" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="05xx xxx xx xx" onChange={(e)=>setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Konu</label>
                    <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" onChange={(e)=>setFormData({...formData, subject: e.target.value})}>
                      <option value="Genel Sorgu">Genel Sorgu</option>
                      <option value="Rezervasyon">Rezervasyon</option>
                      <option value="Şikayet/Öneri">Şikayet / Öneri</option>
                      <option value="Catering">Toplu Sipariş / Catering</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mesajınız *</label>
                  <textarea required rows={5} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none resize-none" placeholder="Size nasıl yardımcı olabiliriz?" onChange={(e)=>setFormData({...formData, message: e.target.value})}></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 text-white py-4 rounded-lg font-bold hover:bg-red-700 transition-all shadow-md">
                  {isSubmitting ? 'Bağlanıyor...' : 'Mesajı WhatsApp ile Gönder'}
                </button>
              </form>
            </div>

            {/* Reklam Alanı */}
            <div className="mt-8">
              <AdBanner dataAdSlot="1122334455" dataAdFormat="auto" dataFullWidthResponsive={true} />
            </div>
          </div>

          {/* İletişim Bilgileri Kartı */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-fit">
              <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">İletişim Bilgilerimiz</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-red-600 font-bold">📍</span>
                  <p className="text-gray-600 text-sm">Mustafa Kemal Paşa, İstiklal Cd. No:68, 34320 Avcılar/İstanbul</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-600 font-bold">📞</span>
                  <p className="text-gray-600 text-sm">0212 423 37 27</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600 font-bold">💬</span>
                  <p className="text-gray-600 text-sm">0545 509 34 62 (WhatsApp)</p>
                </div>
              </div>

              <div className="mt-8">
                 <h4 className="font-semibold text-gray-800 mb-3">Çalışma Saatleri</h4>
                 <p className="text-xs text-gray-500 italic">Her gün: 09:00 - 22:00</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
