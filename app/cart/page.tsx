'use client';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const [cart, setCart] = useState([]);

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

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const itemDetails = cart.map((item) => `- ${item.name} (${item.quantity} Adet) - ${item.price * item.quantity} TL`).join('\n');
    const message = `*BORCAN KEBAP SIPARIS*\n\n${itemDetails}\n\n*Toplam: ${totalPrice} TL*\n\nSiparisi onayliyorum.`;
    const waUrl = `https://wa.me/905455093462?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24">
        <h2 className="text-xl font-bold text-gray-500 mb-4 font-sans">Sepetiniz bos.</h2>
        <a href="/menu" className="bg-red-600 text-white px-6 py-2 rounded-lg font-sans">Menuye Don</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 font-sans text-gray-900">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 border-b pb-2 text-red-600">Siparis Ozeti</h1>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-4 border-b pb-2">
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.quantity} x {item.price} TL</p>
            </div>
            <p className="font-bold">{item.price * item.quantity} TL</p>
          </div>
        ))}
        <div className="mt-6">
          <p className="text-xl font-bold text-right mb-6">Toplam: {totalPrice} TL</p>
          <button 
            onClick={handleWhatsAppOrder}
            className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-700 transition-all"
          >
            Siparisi WhatsApp ile Gonder
          </button>
        </div>
      </div>
    </div>
  );
}