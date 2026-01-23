'use client';
export const dynamic = "force-dynamic";
import { useEffect, useState } from 'react';
import MenuButton from './MenuButton';

export default function MenuPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // API yolunu kontrol ederek verileri çekiyoruz
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (!data || data.error) setError(true);
        else setProducts(Array.isArray(data) ? data : []);
      })
      .catch(() => setError(true));
  }, []);

  if (error) return <div className="pt-32 text-center text-red-600 font-bold">Menü yüklenirken hata oluştu. Lütfen sayfayı yenileyin.</div>;
  if (!products.length) return <div className="pt-32 text-center font-bold text-gray-500 text-xl text-center flex flex-col items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
    Borcan Lezzetleri Hazırlanıyor...
  </div>;

  // İSTEDİĞİNİZ KESİN SIRALAMA
  const priority = ["Izgaralar", "Kebaplar", "Dürümler", "Mezeler", "Salatalar", "Tatlılar", "İçecekler"];
  
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
      <div className="max-w-7xl mx-auto space-y-16">
        {categories.map((category) => (
          <section key={category} id={category.toLowerCase()}>
            <h2 className="text-3xl font-bold text-red-600 mb-8 border-b-4 border-red-600 inline-block pb-2">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.filter((p: any) => p.category === category).map((product: any) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-transform hover:scale-[1.02]">
                  <img src={product.image || 'https://via.placeholder.com/400x300?text=Borcan+Kebap'} alt={product.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-2xl text-gray-800">{product.name}</h3>
                      <span className="font-bold text-2xl text-red-600 bg-red-50 px-3 py-1 rounded-lg">{product.price} ₺</span>
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
