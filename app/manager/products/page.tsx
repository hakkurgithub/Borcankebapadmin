'use client';
import { useEffect, useState } from 'react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(setLoading(false));
      });
  }, []);

  if (loading) return <div className="pt-32 text-center font-bold text-red-600">Ürünler Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Ürün Yönetimi</h1>
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 shadow-md">
            + Yeni Ürün Ekle
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p: any) => (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 group relative transition-all hover:shadow-xl">
              <div className="relative h-48">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                {/* Ürün Üzerindeki Hızlı İşlem Paneli */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700" title="Düzenle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button className="bg-red-600 text-white p-2 rounded-lg shadow-lg hover:bg-red-700" title="Sil">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs font-bold text-gray-400 uppercase">{p.category}</span>
                <h3 className="font-bold text-lg text-gray-800 truncate">{p.name}</h3>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-red-600 font-bold text-xl">{p.price} ₺</span>
                  <span className={p.is_available ? "text-green-500 text-xs font-bold" : "text-gray-400 text-xs font-bold"}>
                    {p.is_available ? "● Satışta" : "● Kapalı"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
