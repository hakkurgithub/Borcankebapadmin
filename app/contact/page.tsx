'use client';

import { useState } from 'react';
import AdBanner from "../../components/AdBanner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'rezervasyon',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const mesaj = `Merhaba Borcan Kebap,%0A%0A` +
                  `*Yeni İletişim Formu Mesajı*%0A` +
                  `--------------------------%0A` +
                  `*İsim:* ${formData.name}%0A` +
                  `*E-posta:* ${formData.email}%0A` +
                  `*Telefon:* ${formData.phone || 'Belirtilmedi'}%0A` +
                  `*Konu:* ${formData.subject}%0A` +
                  `*Mesaj:* ${formData.message}%0A%0A` +
                  `Yanıtınızı bekliyorum.`;

    const whatsappUrl = `https://wa.me/905455093462?text=${mesaj}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSubmitMessage({
        type: 'success',
        text: 'WhatsApp yönlendirmesi başlatıldı!',
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Bize Ulaşın</h1>
          
          {submitMessage && (
            <div className={`mb-6 p-4 rounded-lg ${submitMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {submitMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Ad Soyad *" required className="w-full p-3 border rounded-lg" onChange={(e)=>setFormData({...formData, name: e.target.value})} />
              <input type="email" placeholder="E-posta *" required className="w-full p-3 border rounded-lg" onChange={(e)=>setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="tel" placeholder="Telefon" className="w-full p-3 border rounded-lg" onChange={(e)=>setFormData({...formData, phone: e.target.value})} />
              <select className="w-full p-3 border rounded-lg" onChange={(e)=>setFormData({...formData, subject: e.target.value})}>
                <option value="rezervasyon">Rezervasyon</option>
                <option value="sikayet">Şikayet</option>
                <option value="oneri">Öneri</option>
                <option value="diger">Diğer</option>
              </select>
            </div>
            <textarea placeholder="Mesajınız *" required rows={5} className="w-full p-3 border rounded-lg" onChange={(e)=>setFormData({...formData, message: e.target.value})}></textarea>
            <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 text-white py-4 rounded-lg font-bold hover:bg-red-700 transition-colors">
              {isSubmitting ? 'Yönlendiriliyor...' : 'Mesajı WhatsApp ile Gönder'}
            </button>
          </form>
        </div>
        <div className="mt-8"><AdBanner dataAdSlot="1122334455" dataAdFormat="auto" dataFullWidthResponsive={true} /></div>
      </div>
    </div>
  );
}