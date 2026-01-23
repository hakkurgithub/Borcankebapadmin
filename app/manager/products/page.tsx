'use client';
import { useEffect, useState } from 'react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  return (
    <div className="p-8 pt-24 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Ürün Yönetimi</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p: any) => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow relative group">
            <img src={p.image} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-red-600 font-bold">{p.price} ₺</p>
            {/* Ürün Üzerindeki Düzenleme Paneli */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-blue-600 text-white p-2 rounded-lg text-xs">Düzenle</button>
              <button className="bg-red-600 text-white p-2 rounded-lg text-xs">Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
