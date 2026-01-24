'use client';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const [cart, setCart] = useState([]);

  // 1. SEPETI GORUNTULE (Local Storage tabanlÄ± - Hata payÄ± sÄ±fÄ±r)
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Sepet okuma hatasi');
      }
    }
  }, []);

  const totalPrice = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);

  // 2. SEPETI WHATSAPP'A GONDER (Entegrasyon: 0545 509 34 62)
  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    
    const itemDetails = cart.map((item) => `* ${item.name} (${item.quantity} Adet) - ${item.price * item.quantity} TL`).join('\n');
    const message = `*BORCAN KEBAP YENI SIPARIS*\n\n${itemDetails}\n\n*Toplam Tutar: ${totalPrice} TL*\n\nSiparisi onayliyorum. Lutfen hazirlar misiniz?`;
    
    // WhatsApp API Entegrasyonu (Browser Redirect)
    const waUrl = `https://wa.me/905455093462?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 font-sans">
        <h2 className="text-xl font-bold text-gray-500 mb-4">Sepetiniz su an bos.</h2>
        <a href="/menu" className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-all">Menuye Don</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 font-sans text-gray-900">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-8 border-b pb-4 text-red-600">Siparis Detayi</h1>
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-500 font-semibold">{item.price} TL x {item.quantity}</p>
              </div>
              <p className="font-bold text-lg text-red-600">{item.price * item.quantity} TL</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <div className="flex justify-between items-center mb-8 bg-gray-50 p-6 rounded-2xl">
            <span className="text-xl font-bold text-gray-700">Odenecek Tutar:</span>
            <span className="text-3xl font-black text-red-600">{totalPrice} TL</span>
          </div>
          <button 
            onClick={handleWhatsAppOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-5 rounded-2xl text-xl shadow-2xl transition-transform active:scale-95 flex items-center justify-center gap-3"
          >
            Siparisi WhatsApp ile Gonder íº€
          </button>
        </div>
      </div>
    </div>
  );
}
