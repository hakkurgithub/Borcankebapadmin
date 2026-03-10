'use client';
import Link from 'next/link'; // Güvenli geçiş için ekledik

export default function Contact() {
  // ESKİ BİLGİLERİNİZ - HİÇBİRİ DEĞİŞMEDİ
  const borcanAddress = "Beyoglu Caddesi No: 35/A Parseller, Avcilar/Istanbul";
  const borcanMapsUrl = "https://www.google.com/maps/dir//Parseller,+Beyoğlu+Cd.+No:35,+34320+Avcılar%2Fİstanbul"; 
  const borcanPhone = "0212 423 37 27";
  const borcanWhatsApp = "905455093462";

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Üst Başlık - Aynen Korundu */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold mb-4 text-red-600">İletişim</h1>
          <p className="text-lg text-gray-600">Borcan Kebap Harita ve İletişim Bilgileri</p>
        </div>

        {/* Mevcut İletişim Kutuları - Aynen Korundu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold mb-4">Adresimiz</h3>
            <p className="text-gray-600 mb-8">{borcanAddress}</p>
            <a href={borcanMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-red-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:bg-red-700 transition-all">
              Haritada Yol Tarifi Al
            </a>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold mb-4">Bize Ulaşın</h3>
            <div className="space-y-4">
              <a href={`tel:${borcanPhone}`} className="block w-full py-4 px-6 bg-gray-50 rounded-2xl font-semibold text-gray-700 hover:bg-gray-100 transition-all border border-gray-100">
                📞 {borcanPhone}
              </a>
              <a href={`https://wa.me/${borcanWhatsApp}`} target="_blank" rel="noopener noreferrer" className="block w-full py-4 px-6 bg-green-500 text-white rounded-2xl font-bold shadow-md hover:bg-green-600 transition-all">
                💬 WhatsApp Sipariş Hattı
              </a>
            </div>
          </div>
        </div>

        {/* SADECE BURASI EKLENDİ - SİSTEMİ BOZMAZ */}
        <div className="mt-12 bg-white p-8 rounded-3xl shadow-xl border border-red-50 text-center max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            <span className="bg-red-50 text-red-600 text-[10px] font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">Dijital Hizmet</span>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Dijital Menü QR Kodu</h3>
            <p className="text-gray-500 text-sm mb-6 px-4">Masada menü beklemek istemeyen misafirlerimiz için hazırladığımız karekodu buradan indirebilirsiniz.</p>
            <Link href="/qr-menu" className="bg-orange-500 text-white font-bold py-3 px-10 rounded-xl shadow-lg hover:bg-orange-600 transition-all flex items-center gap-2">
               Karekodu İndir
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}