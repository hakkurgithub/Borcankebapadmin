'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Sayfayi sadece tarayicida calisacak sekilde zorlar (Vercel donmasini engeller)
const CartComponent = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error('Hata'); }
    }
  }, []);

  if (!mounted) return null;

  const totalPrice = cart.reduce((sum: number, item: any) => sum + (Number(item.price) * Number(item.quantity)), 0);

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const itemDetails = cart.map((item: any) => `- ${item.name} (${item.quantity} Adet) - ${item.price * item.quantity} TL`).join('\n');
    const message = `*BORCAN KEBAP SIPARIS*\n\n${itemDetails}\n\n*Toplam: ${totalPrice} TL*`;
    window.open(`https://wa.me/905455093462?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 font-sans text-center px-4">
        <h2 className="text-xl font-bold text-gray-500 mb-6">Sepetiniz şu an boş.</h2>
        <a href="/menu" className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold">Menüye Dön</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-3xl shadow-xl">
        <h1 className="text-2xl font-black mb-6 border-b pb-4 text-red-600">Sipariş Özeti</h1>
        <div className="space-y-4">
          {cart.map((item: any) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4">
              <span className="font-bold text-gray-800">{item.name} ({item.quantity})</span>
              <span className="font-black text-red-600">{item.price * item.quantity} TL</span>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-gray-50 p-6 rounded-2xl flex justify-between items-center">
          <span className="text-lg font-bold">Toplam Tutar:</span>
          <span className="text-2xl font-black text-red-600">{totalPrice} TL</span>
        </div>
        <button 
          onClick={handleWhatsAppOrder}
          className="w-full bg-green-600 text-white font-black py-5 rounded-2xl text-xl mt-8 shadow-lg hover:bg-green-700 transition-transform active:scale-95"
        >
          Siparişi WhatsApp ile Gönder 🚀
        </button>
      </div>
    </div>
  );
};

// Bu satir Vercel'in sunucu tarafli hata vermesini kesin olarak engeller
export default dynamic(() => Promise.resolve(CartComponent), { ssr: false });