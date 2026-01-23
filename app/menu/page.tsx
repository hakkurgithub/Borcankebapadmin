'use client';
export const dynamic = "force-dynamic";
import { useEffect, useState } from 'react';
import MenuButton from './MenuButton';

export default function MenuPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => {
      if (!data || data.error) setError(true);
      else setProducts(data);
    }).catch(() => setError(true));
  }, []);

  if (error) return <div className="pt-32 text-center text-red-600 font-bold">Bağlantı hatası!</div>;
  if (!products.length) return <div className="pt-32 text-center font-bold italic text-gray-500">Lezzetler hazırlanıyor...</div>;

  const priority = ["Döner", "Dürüm", "Kebaplar & Izgaralar", "Kiloluk Ürünler", "Pide & Lahmacun", "Tatlılar", "Yan Ürünler", "Çorbalar", "İçecekler"];
  const categories = [...new Set(products.map((p: any) => p.category))].sort((a: any, b: any) => {
    const indexA = priority.indexOf(a);
    const indexB = priority.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      {/* Kategori Seçenekleri (Butonlar) */}
      <div className="max-w-7xl mx-auto mb-12 sticky top-20 z-40 bg-gray-50/90 py-4 backdrop-blur-sm overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-3 px-2">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => document.getElementById(cat)?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2 bg-white border border-gray-200 rounded-full shadow-sm font-bold text-gray-700 hover:bg-red-600 hover:text-white transition-all active:scale-95"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {categories.map((category) => (
          <section key={category} id={category} className="scroll-mt-40">
            <h2 className="text-3xl font-bold text-red-600 mb-8 border-b-4 border-red-600 inline-block pb-2">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.filter((p: any) => p.category === category).map((product: any) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <img src={product.image || ''} alt={product.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-xl">{product.name}</h3>
                      <span className="font-bold text-xl text-red-600 bg-red-50 px-3 py-1 rounded-lg">{product.price} ₺</span>
                    </div>
                    <MenuButton product={product} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
