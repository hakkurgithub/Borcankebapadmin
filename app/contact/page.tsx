'use client';

export default function Contact() {
  const borcanAddress = "Beyoƒülu Caddesi No: 35/A Parseller, Avcƒ±lar/ƒ∞stanbul";
  const borcanMapsUrl = "https://maps.app.goo.gl/9S5mB8pM8p8p8p8p8"; // Borcan Kebap Google Harita Linki
  const borcanPhone = "0212 423 37 27";
  const borcanWhatsApp = "905455093462";

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">ƒ∞leti≈üim</h1>
          <p className="text-lg text-gray-600">Lezzetin adresi Borcan Kebap'a ho≈ü geldiniz.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ADRES VE HARƒ∞TA BUTONU */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-2xl">Ì≥ç</div>
              <h3 className="text-xl font-bold text-gray-900">Adresimiz</h3>
            </div>
            <p className="text-gray-600 mb-8 leading-relaxed">{borcanAddress}</p>
            <a 
              href={borcanMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95"
            >
              <span>Ì∑∫Ô∏è</span>
              <span>Haritada Yol Tarifi Al</span>
            </a>
          </div>

          {/* TELEFON VE WHATSAPP */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl">Ì≥û</div>
              <h3 className="text-xl font-bold text-gray-900">Bize Ula≈üƒ±n</h3>
            </div>
            <div className="space-y-4">
              <a href={`tel:${borcanPhone}`} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors group">
                <span className="text-xl">‚òéÔ∏è</span>
                <span className="font-bold text-gray-700 group-hover:text-red-600">{borcanPhone}</span>
              </a>
              <a href={`https://wa.me/${borcanWhatsApp}`} target="_blank" className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-green-50 transition-colors group">
                <span className="text-xl">Ì≤¨</span>
                <span className="font-bold text-gray-700 group-hover:text-green-600">WhatsApp Hattƒ±mƒ±z</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
