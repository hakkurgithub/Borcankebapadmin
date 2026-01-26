'use client';
import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // ÜRÜN SİLEN FONKSİYON
  const removeItem = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    if (updated.length === 0) window.location.reload();
  };

  if (!mounted) return null;

  const total = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);

  if (cart.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 bg-stone-50">
      <h2 className="text-xl font-bold text-gray-400 mb-6">Sepetiniz Boş</h2>
      <a href="/menu" className="bg-red-600 text-white px-10 py-4 rounded-2xl font-black">Menüye Dön</a>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 pt-28 px-4 pb-20">
      <div className="max-w-md mx-auto bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100">
        <h1 className="text-3xl font-black text-red-600 mb-8">Siparişiniz</h1>
        
        <div className="space-y-4 mb-10">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-red-50 p-5 rounded-2xl border border-red-100">
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-lg">{item.name}</p>
                <p className="text-red-600 font-black">{item.price} TL</p>
              </div>
              {/* SADECE İSTEDİĞİNİZ SİLME TUŞU */}
              <button 
                onClick={() => removeItem(index)} 
                className="ml-4 p-3 bg-white text-red-600 rounded-xl shadow-md hover:bg-red-600 hover:text-white transition-all"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-red-600 p-6 rounded-3xl flex justify-between items-center mb-8 shadow-lg">
          <span className="text-lg font-bold text-white">Toplam:</span>
          <span className="text-3xl font-black text-white">{total} TL</span>
        </div>

        <button 
          onClick={() => {
            const msg = cart.map(i => `- ${i.name}`).join('\n');
            window.open(`https://wa.me/905455093462?text=${encodeURIComponent("*BORCAN KEBAP SIPARIS*\n\n"+msg+"\n\n*Toplam: "+total+" TL*")}`);
          }}
          className="w-full bg-green-600 text-white font-black py-6 rounded-3xl text-2xl shadow-xl hover:scale-105 transition-transform"
        >
          WhatsApp'tan Gönder 🚀
        </button>
      </div>
    </div>
  );
}