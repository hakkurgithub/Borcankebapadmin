'use client';

import { useEffect, useState } from 'react';

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tarayıcı hafızasını zorla oku ve sunucuyu tamamen devre dışı bırak
    const data = localStorage.getItem('cart');
    if (data) {
      try {
        setCart(JSON.parse(data));
      } catch (e) {
        console.error("Sepet hatası");
      }
    }
    setLoading(false);
  }, []);

  // Sayfa yüklenirken o 6 saniyelik donmayı (INP) engelleyen bariyer
  if (loading) return <div className="min-h-screen bg-white"></div>;

  const total = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);

  const handleWhatsApp = () => {
    const list = cart.map(i => `* ${i.name} (${i.quantity} Adet)`).join('\n');
    const msg = `*BORCAN KEBAP SIPARIS*\n\n${list}\n\n*Toplam: ${total} TL*`;
    window.open(`https://wa.me/905455093462?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sans">
        <h2 className="text-xl text-gray-400 mb-6 font-bold">Sepetiniz şu an boş görünüyor.</h2>
        <a href="/menu" className="bg-red-600 text-white px-10 py-4 rounded-2xl font-black">MENÜYE DÖN</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 font-sans text-gray-900">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-[40px] shadow-2xl">
        <h1 className="text-3xl font-black mb-8 text-red-600">Siparişiniz</h1>
        <div className="space-y-4 mb-8">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between border-b pb-4 items-center">
              <span className="font-bold">{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
              <span className="font-black text-red-600">{item.price * item.quantity} TL</span>
            </div>
          ))}
        </div>
        <div className="bg-red-50 p-6 rounded-3xl flex justify-between items-center mb-8">
          <span className="text-xl font-bold">Ödenecek Tutar:</span>
          <span className="text-3xl font-black text-red-600">{total} TL</span>
        </div>
        <button 
          onClick={handleWhatsApp}
          className="w-full bg-green-600 text-white font-black py-6 rounded-3xl text-2xl shadow-xl hover:bg-green-700 active:scale-95 transition-all"
        >
          WHATSAPP'TAN GÖNDER 🚀
        </button>
      </div>
    </div>
  );
}