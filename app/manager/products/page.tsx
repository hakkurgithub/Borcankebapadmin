'use client';
import { useEffect, useState } from 'react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Ürün Yönetimi</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p: any) => (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border group relative">
              <div className="relative h-48">
                <img src={p.image} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex gap-2 opacity-100 transition-opacity">
                  <button className="bg-blue-600 text-white p-2 rounded-lg text-xs font-bold shadow-md">Düzenle</button>
                  <button className="bg-red-600 text-white p-2 rounded-lg text-xs font-bold shadow-md">Sil</button>
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs text-gray-400 uppercase font-bold">{p.category}</span>
                <h3 className="font-bold truncate text-gray-800">{p.name}</h3>
                <p className="text-red-600 font-bold text-lg">{p.price} ₺</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
