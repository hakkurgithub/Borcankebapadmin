'use client';

import Link from 'next/link';
import { useState } from 'react';
import AdBanner from "../../components/AdBanner"; // Reklam bileşeni

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<
    { type: 'success' | 'error'; text: string } | null
  >(null);

  // WHATSAPP YÖNLENDİRME FONKSİYONU
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mesaj içeriğini hazırlıyoruz
    const mesaj = `Merhaba Borcan Kebap,%0A%0A` +
                  `*Yeni İletişim Formu Mesajı*%0A` +
                  `--------------------------%0A` +
                  `*İsim:* ${formData.name}%0A` +
                  `*E-posta:* ${formData.email}%0A` +
                  `*Telefon:* ${formData.phone || 'Belirtilmedi'}%0A` +
                  `*Konu:* ${formData.subject}%0A` +
                  `*Mesaj:* ${formData.message}%0A%0A` +
                  `Yanıtınızı bekliyorum.`;

    // Sizin numaranız
    const whatsappUrl = `https://wa.me/905455093462?text=${mesaj}`;

    // Kullanıcıya bilgi verip WhatsApp'ı açıyoruz
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSubmitMessage({
        type: 'success',
        text: 'WhatsApp yönlendirmesi başlatıldı! Lütfen açılan pencereden mesajı gönderin.',
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://raw.githubusercontent.com/hakkurgithub/images/main/hero.png')`,
        }}
      >
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
          
          {/* Sol Taraf: İletişim Formu */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Mesaj Gönderin</h2>

              {submitMessage && (
                <div className={`mb-6 p-4 rounded-lg ${submitMessage.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                  <div className="flex items-center">
                    <i className={`${submitMessage.type === 'success' ? 'ri-check-circle-line' : 'ri-error-warning-line'} mr-2`}></i>
                    {submitMessage.text}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad *</label>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Adınız ve soyadınız" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">E-posta *</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="email@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="+90 5xx xxx xx xx" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Konu *</label>
                    <select id="subject" name="subject" required value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                      <option value="">Konu seçiniz</option>
                      <option value="rezervasyon">Rezervasyon</option>
                      <option value="sikayet">Şikayet</option>
                      <option value="oneri">Öneri</option>
                      <option value="catering">Catering Hizmetleri</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mesaj *</label>
                  <textarea id="message" name="message" required rows={6} maxLength={500} value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" placeholder="Mesajınızı buraya yazın..." />
                  <div className="text-right text-xs text-gray-500 mt-1">{formData.message.length}/500 karakter</div>
                </div>

                <button type="submit" disabled={isSubmitting || formData.message.length > 500} className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  {isSubmitting ? 'WhatsApp Uygulamasına Gidiliyor...' : 'Mesajı WhatsApp ile Gönder'}
                </button>
              </form>
            </div>

            {/* --- REKLAM ALANI --- */}
            <div className="mt-8">
                <AdBanner 
                  dataAdSlot="1122334455" 
                  dataAdFormat="auto"
                  dataFullWidthResponsive={true}
                />
            </div>
          </div>

          {/* Sağ Taraf: Bilgiler */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">İletişim Bilgileri</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-map-pin-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Adres</h4>
                    <p className="text-gray-600">Mustafa Kemal Paşa, Mahallesi, İstiklal Cd. No:68, 34320 Avcılar/İstanbul</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-phone-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Telefon</h4>
                    <p className="text-gray-600">0212 423 37 27</p>
                  </div>
                </div>
                <div className="flex items-start">
