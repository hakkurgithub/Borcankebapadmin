'use client';

export default function Contact() {
  const borcanAddress = "Beyoglu Caddesi No: 35/A Parseller, Avcilar/Istanbul";
  // Gercek Google Haritalar baglantisi
  const borcanMapsUrl = "https://www.google.com/maps/dir//Parseller,+Beyoğlu+Cd.+No:35,+34320+Avcılar%2Fİstanbul"; 
  const borcanPhone = "0212 423 37 27";
  const borcanWhatsApp = "905455093462";

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold mb-4 text-red-600">Iletisim</h1>
          <p className="text-lg text-gray-600">Borcan Kebap Harita ve Iletisim Bilgileri</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold mb-4">Adresimiz</h3>
            <p className="text-gray-600 mb-8">{borcanAddress}</p>
            {/* DUZELTILEN SATIR BURASI */}
            <a href={borcanMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-red-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:bg-red-700 transition-all">
              Haritada Yol Tarifi Al
            </a>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold mb-4">Bize Ulasin</h3>
            <div className="space-y-4">
              <a href={`tel:${borcanPhone}`} className="block p-4 bg-gray-50 rounded-2xl font-bold">{borcanPhone}</a>
              <a href={`https://wa.me/${borcanWhatsApp}`} target="_blank" className="block p-4 bg-gray-50 rounded-2xl font-bold text-green-600">WhatsApp Siparis</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}