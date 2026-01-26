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

  // ÜRÜNÜ SİLEN FONKSİYON
  const removeItem = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    if (updated.length === 0) window.location.reload();
  };

  if (!mounted) return null;

  const total = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h2 className="text-xl font-bold text-gray-400 mb-6">Sepetiniz Boş</h2>
        <a href="/menu" className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold">Menüye Dön</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4 pb-12">
      <div className="max-w-md mx-auto bg-white p-6 rounded-[32px] shadow-2xl">
        <h1 className="text-2xl font-black text-red-600 mb-6">Siparişiniz</h1>
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-red-50 p-4 rounded-2xl border border-red-100">
              <div>
                <p className="font-bold text-gray-800">{item.name}</p>
                <p className="text-red-600 font-black">{item.price} TL</p>
              </div>
              {/* SİLME BUTONU - TRASH SİMGESİ */}
              <button 
                onClick={() => removeItem(index)} 
                className="p-3 bg-white text-red-600 rounded-xl shadow-sm hover:bg-red-600 hover:text-white transition-all"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 p-6 bg-red-600 text-white rounded-2xl flex justify-between items-center">
          <span className="text-lg font-bold">Toplam:</span>
          <span className="text-2xl font-black">{total} TL</span>
        </div>
        <button 
          onClick={() => {
            const msg = cart.map(i => `- ${i.name}`).join('\n');
            window.open(`https://wa.me/905455093462?text=${encodeURIComponent("*BORCAN KEBAP SIPARIS*\n\n"+msg+"\n\n*Toplam: "+total+" TL*")}`);
          }}
          className="w-full bg-green-600 text-white font-black py-5 rounded-2xl text-xl mt-6 shadow-lg"
        >
          WhatsApp'tan Gönder 🚀
        </button>
      </div>
    </div>
  );
}