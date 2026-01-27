'use client';
import { useEffect, useState } from 'react';
import { Trash2, ShoppingBag, MapPin, Phone, CreditCard, Banknote } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    paymentMethod: 'CASH'
  });

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const removeItem = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage')); // Navbar sayacını anında günceller
  };

  if (!mounted) return null;

  const total = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 pt-20">
        <ShoppingBag className="w-20 h-20 text-stone-300 mb-4" />
        <h2 className="text-2xl font-bold text-stone-400 mb-6">Sepetiniz şu an boş.</h2>
        <Link href="/menu" className="bg-red-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-red-700 transition-colors">
          Menüye Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 pt-32 pb-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL TARAF: ÜRÜN LİSTESİ (Abdullah Usta Stili) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-black text-stone-800 mb-6 flex items-center gap-2">
            Sepetim <span className="text-red-600">({cart.length} Ürün)</span>
          </h2>
          {cart.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-[24px] shadow-sm border border-stone-200 flex items-center gap-6 hover:shadow-md transition-shadow">
              <div className="flex-grow">
                <h3 className="font-bold text-stone-900 text-lg">{item.name}</h3>
                <p className="text-red-600 font-black text-xl">{item.price} ₺</p>
              </div>
              <div className="text-sm font-black bg-stone-100 px-4 py-2 rounded-full text-stone-500">
                x{item.quantity || 1}
              </div>
              {/* BEKLEDİĞİNİZ SİLME TUŞU */}
              <button 
                onClick={() => removeItem(index)} 
                className="bg-stone-50 text-stone-400 hover:bg-red-50 hover:text-red-600 p-3 rounded-xl transition-all border border-stone-100"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>

        {/* SAĞ TARAF: SİPARİŞİ TAMAMLA FORMU */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[32px] shadow-xl border border-stone-200 sticky top-28">
            <h2 className="text-2xl font-black text-stone-900 mb-8">Siparişi Tamamla</h2>
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-stone-700 mb-2">
                  <MapPin className="w-4 h-4 text-red-600" /> Teslimat Adresi
                </label>
                <textarea 
                  placeholder="Adresiniz..." 
                  className="w-full p-4 border rounded-2xl h-24 bg-stone-50 focus:ring-2 focus:ring-red-600 transition-all outline-none text-sm"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-stone-700 mb-2">
                  <Phone className="w-4 h-4 text-red-600" /> Telefon
                </label>
                <input 
                  type="tel" 
                  placeholder="05XX..." 
                  className="w-full p-4 border rounded-2xl bg-stone-50 focus:ring-2 focus:ring-red-600 outline-none"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-stone-700 mb-3 block">Ödeme Yöntemi</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setFormData({...formData, paymentMethod: 'CASH'})}
                    className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 font-bold transition-all ${formData.paymentMethod === 'CASH' ? 'border-red-600 bg-red-50 text-red-600' : 'border-stone-100 bg-stone-50 text-stone-400'}`}
                  >
                    <Banknote className="w-5 h-5" /> Nakit
                  </button>
                  <button 
                    onClick={() => setFormData({...formData, paymentMethod: 'CARD'})}
                    className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 font-bold transition-all ${formData.paymentMethod === 'CARD' ? 'border-red-600 bg-red-50 text-red-600' : 'border-stone-100 bg-stone-50 text-stone-400'}`}
                  >
                    <CreditCard className="w-5 h-5" /> Kart
                  </button>
                </div>
              </div>
              
              <div className="pt-6 border-t border-dashed mt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-stone-500">Toplam</span>
                  <span className="text-3xl font-black text-red-600">{total} ₺</span>
                </div>
                <button 
                  onClick={() => {
                    const msg = cart.map(i => `- ${i.name} (${i.price} ₺)`).join('\n');
                    const detail = `*Adres:* ${formData.address}\n*Tel:* ${formData.phone}\n*Ödeme:* ${formData.paymentMethod === 'CASH' ? 'Nakit' : 'Kart'}`;
                    window.open(`https://wa.me/905455093462?text=${encodeURIComponent("*BORCAN KEBAP SIPARIS*\n\n" + msg + "\n\n" + detail + "\n\n*TOPLAM: " + total + " ₺*")}`);
                  }}
                  className="w-full bg-green-600 text-white py-5 rounded-2xl font-black text-xl shadow-lg hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  Siparişi Onayla 🚀
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}