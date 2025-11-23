import { authOptions } from "../../lib/auth"; // Auth ayarlarını çekiyoruz
import { getServerSession } from "next-auth"; // Sunucu tarafı oturum kontrolü
import { redirect } from "next/navigation";
import { getAllOrders, getAllProducts } from "../../lib/products";
import Link from "next/link";

export default async function ManagerPage() {
  // 🔒 GÜVENLİK KONTROLÜ
  const session = await getServerSession(authOptions);
  
  // Eğer oturum yoksa login'e at
  if (!session) {
    redirect("/login");
  }

  // Eğer giriş yapan kişi manager değilse ana sayfaya at (İsteğe bağlı)
  // if ((session.user as any).role !== "manager") { redirect("/"); }

  let allOrders: any[] = [];
  let allProducts: any[] = [];
  let dbError: string | null = null;
  
  try {
    allOrders = await getAllOrders();
    allProducts = await getAllProducts();
  } catch (error) {
    console.error("❌ Yönetici Paneli Hatası:", error);
    dbError = "Veritabanı bağlantısında sorun oluştu.";
  }
  
  const totalOrders = allOrders.length;
  const totalRevenue = allOrders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const activeProducts = allProducts.filter((p: any) => p.isActive === 1 || p.is_active === 1).length;

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50">
      {/* Üst Kısım */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800">Yönetici Paneli</h1>
          <p className="text-sm text-gray-500 mt-1">
            Hoş geldiniz, <span className="font-semibold text-red-600">{session.user?.name}</span>
          </p>
        </div>
        <div className="flex gap-3">
           <a href="/" className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            🏠 Siteye Git
          </a>
          <Link href="/manager/products" className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md flex items-center gap-2 font-bold transition-transform hover:scale-105">
            📦 MENÜYÜ DÜZENLE
          </Link>
        </div>
      </div>
      
      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wider">Toplam Sipariş</h3>
          <p className="text-4xl font-bold text-gray-800 mt-2">{totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wider">Toplam Ciro</h3>
          <p className="text-4xl font-bold text-green-600 mt-2">
            {totalRevenue.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wider">Aktif Ürünler</h3>
          <p className="text-4xl font-bold text-blue-600 mt-2">{activeProducts}</p>
        </div>
      </div>

      {/* Son Siparişler Tablosu */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-800">Son Siparişler</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">#ID</th>
                <th className="px-6 py-3 text-left">Müşteri</th>
                <th className="px-6 py-3 text-left">Durum</th>
                <th className="px-6 py-3 text-left">Tip</th>
                <th className="px-6 py-3 text-right">Tutar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allOrders.length > 0 ? (
                allOrders.slice(0, 10).map((order: any) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.customerName || 'Misafir'}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Tamamlandı' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.orderType || order.order_type}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-800 text-right">
                      {Number(order.total).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="p-6 text-center text-gray-500">Sipariş yok.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}