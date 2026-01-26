'use client';
import { useEffect, useState } from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // ÜRÜN SİLME - BU FONKSİYON ARTIK AKTİF
  const removeItem = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage')); // Navbar'ı uyarır
  };

  if (!mounted) return null;

  const total = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-20">
        <ShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-400">Sepetiniz Boş</h2>
        <a href="/menu" className="mt-6 bg-red-600 text-white px-8 py-3 rounded-xl font-bold">Menüye Dön</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4 pb-12">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-3xl shadow-2xl border border-gray-100">
        <h1 className="text-2xl font-black text-red-600 mb-6 border-b pb-4">Sipariş Özeti</h1>
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-red-50 p-4 rounded-2xl border border-red-100">
              <div className="flex-1">
                <p className="font-bold text-gray-800">{item.name}</p>
                <p className="text-red-600 font-black">{item.price} TL</p>
              </div>
              {/* SİLME BUTONU BURADA */}
              <button 
                onClick={() => removeItem(index)} 
                className="ml-4 p-3 bg-white text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-200"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 p-6 bg-red-600 text-white rounded-2xl flex justify-between items-center shadow-lg">
          <span className="text-lg font-bold">Ödenecek Tutar:</span>
          <span className="text-2xl font-black">{total} TL</span>
        </div>
        <button 
          onClick={() => {
            const msg = cart.map(i => `- ${i.name}`).join('\n');
            window.open(`https://wa.me/905455093462?text=${encodeURIComponent("*BORCAN KEBAP SIPARIS*\n\n"+msg+"\n\n*Toplam: "+total+" TL*")}`);
          }}
          className="w-full bg-green-600 text-white font-black py-5 rounded-2xl text-xl mt-6 shadow-xl hover:bg-green-700 transition-colors"
        >
          WhatsApp ile Gönder 🚀
        </button>
      </div>
    </div>
  );
}