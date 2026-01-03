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
  const [showOrderDropdown, setShowOrderDropdown] = useState(false);

  // WHATSAPP GÖNDERİMİ
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

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Orijinal Görsel ve Tasarım */}
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url('https://raw.githubusercontent.com/hakkurgithub/images/main/hero.png')` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">İletişim</h1>
            <p className="text-xl max-w-2xl mx-auto">Bizimle iletişime geçin</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Form Alanı */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Mesaj Gönderin</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Ad Soyad *" />
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="E-posta *" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Telefon *" />
                  <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                    <option value="">Konu Seçiniz</option>
                    <option value="reservation">Rezervasyon</option>
                    <option value="complaint">Şikayet</option>
                    <option value="suggestion">Öneri</option>
                  </select>
                </div>
                <textarea name="message" required rows={6} value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Mesajınız *" />
                <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  {isSubmitting ? 'Bağlanıyor...' : 'Mesajı WhatsApp ile Gönder'}
                </button>
              </form>
            </div>
            {/* Reklam Alanı */}
            <div className="mt-8">
              <AdBanner dataAdSlot="1122334455" dataAdFormat="auto" dataFullWidthResponsive={true} />
            </div>
          </div>

          {/* Yan Panel: Bilgiler ve Hızlı İşlemler */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">İletişim Bilgileri</h3>
              <div className="space-y-4">
                <p><strong>📍 Adres:</strong> Mustafa Kemal Paşa, İstiklal Cd. No:68, 34320 Avcılar/İstanbul</p>
                <p><strong>📞 Telefon:</strong> 0212 423 37 27</p>
                <p><strong>💬 WhatsApp:</strong> 0545 509 34 62</p>
              </div>
            </div>

            <div className="bg-red-600 text-white rounded-xl p-8 space-y-4">
              <h3 className="text-2xl font-bold mb-4">Hızlı İşlemler</h3>
              <Link href="/reservation" className="block w-full bg-white text-red-600 py-3 rounded-lg text-center font-bold">Rezervasyon Yap</Link>
              <Link href="/menu" className="block w-full bg-white text-red-600 py-3 rounded-lg text-center font-bold">Menüyü İncele</Link>
            </div>
          </div>
        </div>

        {/* Harita */}
        <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.650221323386!2d28.7118833122003!3d40.98914607123473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa16283f56d95%3A0xc6c37f48074d092d!2zQm9yY2FuIEtlYmFwIFBpZGUgTGFobWFjdW4!5e0!3m2!1str!2str!4v1735936800000!5m2!1str!2str" width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
        </div>
      </div>
    </div>
  );
}
