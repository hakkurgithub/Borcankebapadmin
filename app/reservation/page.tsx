'use client';

import Link from 'next/link';
import { useState } from 'react';
import AdBanner from "../../components/AdBanner";

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
    
    // Mesaj Formatı
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
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-100">
        <h1 className="text-3xl font-bold text-center mb-8 text-red-600">Rezervasyon Yap</h1>
        <form onSubmit={handleWhatsAppReservation} className="space-y-4">
          <input type="text" placeholder="Ad Soyad" required className="w-full p-3 border rounded-lg" onChange={(e)=>setFormData({...formData, name: e.target.value})} />
          <input type="tel" placeholder="Telefon" required className="w-full p-3 border rounded-lg" onChange={(e)=>setFormData({...formData, phone: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <input type="date" required className="p-3 border rounded-lg" onChange={(e)=>setFormData({...formData, date: e.target.value})} />
            <input type="time" required className="p-3 border rounded-lg" onChange={(e)=>setFormData({...formData, time: e.target.value})} />
          </div>
          <select className="w-full p-3 border rounded-lg" onChange={(e)=>setFormData({...formData, guests: e.target.value})}>
            {[1,2,3,4,5,6,8,10].map(n => <option key={n} value={n}>{n} Kişi</option>)}
          </select>
          <textarea placeholder="Özel istekleriniz..." className="w-full p-3 border rounded-lg h-24" onChange={(e)=>setFormData({...formData, note: e.target.value})}></textarea>
          <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-lg font-bold hover:bg-red-700 transition-all">
            Rezervasyonu WhatsApp ile Tamamla
          </button>
        </form>
      </div>
    </div>
  );
}    // Sizin numaranız
    const whatsappUrl = `https://wa.me/905455093462?text=${mesaj}`;

    // Kısa bir gecikme simülasyonu (Kullanıcıya gönderiliyor hissi vermek için)
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

          {/* Sağ Taraf: Bilgiler (Aynen Korundu) */}
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
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-whatsapp-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">WhatsApp</h4>
                    <p className="text-gray-600">0545 509 34 62</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Sosyal Medya</h3>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => window.open('https://www.facebook.com/profile.php?id=61579514506784&locale=tr_TR', '_blank')} className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <i className="ri-facebook-fill text-2xl text-blue-600 mr-3"></i> Facebook
                </button>
                <button onClick={() => window.open('https://www.instagram.com/borcan_kebap_pide_lahmacun?utm_source=qr&igsh=d2twdW0yZ2FqaGJl', '_blank')} className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <i className="ri-instagram-fill text-2xl text-pink-600 mr-3"></i> Instagram
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 border-b">
            <h3 className="text-2xl font-bold text-gray-800">Konum</h3>
            <p className="text-gray-600 mt-2">Mustafa Kemal Paşa, İstiklal Cd. No:68, 34320 Avcılar/İstanbul</p>
          </div>
          <div className="h-96 w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.650228345711!2d28.7126!3d40.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDU5JzI0LjAiTiAyOMKwNDInNDUuNCJF!5e0!3m2!1str!2str!4v1620000000000!5m2!1str!2str"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Borcan Kebap Konum"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
