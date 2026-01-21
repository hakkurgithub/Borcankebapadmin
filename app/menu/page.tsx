export const dynamic = 'force-dynamic';
import { prisma } from '../../lib/prisma'; // '@' yerine doğrudan yol kullanıldı
import Image from 'next/image';
import MenuButton from './MenuButton'; // Dosyanın bu klasörde olduğu teyit edilmeli

// Sayfanın her zaman güncel kalmasını sağlar
export const dynamic = 'force-dynamic';

export default async function MenuPage() {
  try {
    // 1. Ürünleri Veritabanından Çek
    const rawProducts = await prisma.product.findMany({
      orderBy: { name: 'asc' }
    });

    if (!rawProducts || rawProducts.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 flex items-center justify-center">
          <div className="text-center p-12 bg-white rounded-2xl shadow-xl border border-red-100 max-w-md">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Henüz Ürün Eklenmemiş</h2>
            <p className="text-gray-600 mb-6">Restoran menümüz şu an güncelleniyor. Lütfen daha sonra tekrar kontrol edin.</p>
            <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-6 py-2 rounded-full font-bold">Sayfayı Yenile</button>
          </div>
        </div>
      );
    }

    // 2. Sayısal dönüşüm (Decimal Hatasını Çözer)
    const products = rawProducts.map((product) => ({
      ...product,
      price: Number(product.price)
    }));

    const categories = [...new Set(products.map((p) => p.category))];

    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Lezzet Menümüz</h1>
            <p className="text-gray-600 font-medium bg-white inline-block px-4 py-1 rounded-full border border-red-100 shadow-sm">
              {products.length} çeşit seçkin lezzet
            </p>
          </div>

          <div className="space-y-16">
            {categories.map((category) => {
              const categoryProducts = products.filter((p) => p.category === category);
              return (
                <section key={category}>
                  <div className="flex items-center mb-8 border-b-2 border-red-200 pb-3">
                     <h2 className="text-3xl font-bold text-red-600 mr-4">{category}</h2>
                     <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">
                        {categoryProducts.length} Ürün
                     </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryProducts.map((product) => (
                      <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group">
                        <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              onError={(e: any) => e.target.src = 'https://raw.githubusercontent.com/hakkurgithub/images/main/placeholder.jpg'}
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-300">Resim Yok</div>
                          )}
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-bold text-xl text-gray-900">{product.name}</h3>
                            <span className="font-bold text-xl text-red-600">{product.price} ₺</span>
                          </div>
                          <p className="text-gray-500 text-sm mb-6 line-clamp-2">{product.description}</p>
                          <MenuButton product={product} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="pt-32 text-center text-red-600 font-bold">
        Veritabanı bağlantı hatası! Lütfen DATABASE_URL ayarlarını kontrol edin.
      </div>
    );
  }
}