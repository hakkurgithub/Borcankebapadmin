'use client';
import { useEffect, useState } from 'react';
import MenuButton from './MenuButton';

export default function MenuPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => data.error ? setError(true) : setProducts(data))
      .catch(() => setError(true));
  }, []);

  if (error) return <div className="pt-32 text-center text-red-600 font-bold">Bağlantı tazeleyiniz...</div>;
  if (!products.length) return <div className="pt-32 text-center font-bold">Lezzetler hazırlanıyor...</div>;

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        {categories.map(category => (
          <section key={category}>
            <h2 className="text-3xl font-bold text-red-600 mb-8 border-b pb-3">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.filter(p => p.category === category).map(product => (
                <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <img src={product.image || ''} alt={product.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <div className="flex justify-between mb-3">
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
