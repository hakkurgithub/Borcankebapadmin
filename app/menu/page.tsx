export const dynamic = 'force-dynamic';
import { prisma } from '../../lib/prisma';
import Image from 'next/image';
import MenuButton from './MenuButton';

export default async function MenuPage() {
  try {
    const rawProducts = await prisma.product.findMany({
      orderBy: { name: 'asc' }
    });

    if (!rawProducts || rawProducts.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 flex items-center justify-center">
          <div className="text-center p-12 bg-white rounded-2xl shadow-xl border border-red-100 max-w-md">
            <h2 className="text-2xl font-bold text-gray-800">Menü Hazırlanıyor</h2>
          </div>
        </div>
      );
    }

    const products = rawProducts.map((p) => ({ ...p, price: Number(p.price) }));
    const categories = [...new Set(products.map((p) => p.category))];

    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {categories.map((category) => (
              <section key={category}>
                <h2 className="text-3xl font-bold text-red-600 mb-8 border-b-2 border-red-200 pb-3">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.filter((p) => p.category === category).map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                      <div className="relative h-64 w-full bg-gray-100">
                        <img src={product.image || ''} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-xl text-gray-900">{product.name}</h3>
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
      </div>
    );
  } catch (error) {
    return <div className="pt-32 text-center text-red-600 font-bold">Veritabanı bağlantısı tazeleyiniz...</div>;
  }
}