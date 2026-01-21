'use client';

import Link from 'next/link';
import { useState } from 'react';
import AdBanner from "../../components/AdBanner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const mesaj = `Merhaba Borcan Kebap,%0A%0A` +
                  `*Yeni İletişim Formu Mesajı*%0A` +
                  `--------------------------%0A` +
                  `*İsim:* ${formData.name}%0A` +
                  `*E-posta:* ${formData.email}%0A` +
                  `*Telefon:* ${formData.phone}%0A` +
                  `*Konu:* ${formData.subject || 'Genel Sorgu'}%0A` +
                  `*Mesaj:* ${formData.message}%0A%0A` +
                  `Yanıtınızı bekliyorum.`;

    window.open(`https://wa.me/905455093462?text=${mesaj}`, '_blank');
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url('https://raw.githubusercontent.com/hakkurgithub/images/main/hero.png')` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div>
            <h1 className="text-5xl font-bold mb-4">İletişim</h1>
            <p className="text-xl max-w-2xl mx-auto">Bizimle iletişime geçin</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Mesaj Gönderin</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" name="name" required onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Ad Soyad *" />
                  <input type="email" name="email" required onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="E-posta *" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="tel" name="phone" required onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Telefon *" />
                  <select name="subject" onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                    <option value="">Konu Seçiniz</option>
                    <option value="reservation">Rezervasyon</option>
                    <option value="complaint">Şikayet</option>
                    <option value="suggestion">Öneri</option>
                  </select>
                </div>
                <textarea name="message" required rows={6} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Mesajınız *" />
                <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  {isSubmitting ? 'Bağlanıyor...' : 'Mesajı WhatsApp ile Gönder'}
                </button>
              </form>
            </div>
            <div className="mt-8">
              <AdBanner dataAdSlot="1122334455" dataAdFormat="auto" dataFullWidthResponsive={true} />
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">İletişim Bilgileri</h3>
              <div className="space-y-4">
                <p className="flex items-start"><span className="mr-2">📍</span> Mustafa Kemal Paşa, İstiklal Cd. No:68, 34320 Avcılar/İstanbul</p>
                <p className="flex items-center"><span className="mr-2">📞</span> 0212 423 37 27</p>
                <p className="flex items-center"><span className="mr-2">💬</span> 0545 509 34 62 (WhatsApp)</p>
              </div>
            </div>

            <div className="bg-red-600 text-white rounded-xl p-8 space-y-4 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Hızlı İşlemler</h3>
              <Link href="/reservation" className="block w-full bg-white text-red-600 py-3 rounded-lg text-center font-bold hover:bg-gray-100 transition-colors">Rezervasyon Yap</Link>
              <Link href="/menu" className="block w-full bg-white text-red-600 py-3 rounded-lg text-center font-bold hover:bg-gray-100 transition-colors">Menüyü İncele</Link>
            </div>
          </div>
        </div>

        {/* BURASI DÜZELTİLDİ: Orijinal dosyanızdaki nokta atışı Google Haritalar linki */}
        <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden border-4 border-white">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.517304193301!2d28.711812876555197!3d40.99205562041285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa110034a71d7%3A0xe98822538f71058a!2sBorcan%20Kebap!5e0!3m2!1str!2str!4v1716301389803!5m2!1str!2str" 
            width="100%" 
            height="500" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}