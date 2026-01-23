'use client';
import { useEffect, useState } from 'react';
import MenuButton from './MenuButton';

export default function MenuPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  const priority = ["Kebaplar & Izgaralar", "Dürüm", "Mezeler", "Tatlılar", "İçecekler"];
  const categories = [...new Set(products.map((p: any) => p.category))].sort((a, b) => {
    const idxA = priority.indexOf(a as string);
    const idxB = priority.indexOf(b as string);
    return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      {/* Kategori Butonları */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md shadow-sm py-4 mb-8 overflow-x-auto whitespace-nowrap flex justify-center gap-3 px-4">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => document.getElementById(cat)?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2 bg-gray-100 rounded-full font-bold text-gray-700 hover:bg-red-600 hover:text-white transition-all shadow-sm"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-16">
        {categories.map((category) => (
          <section key={category} id={category} className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-red-600 mb-8 border-b-4 border-red-600 inline-block pb-2">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.filter((p: any) => p.category === category).map((product: any) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-xl">{product.name}</h3>
                      <span className="font-bold text-xl text-red-600">{product.price} ₺</span>
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
