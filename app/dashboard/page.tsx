import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";
import { getUserOrders } from "../../lib/products";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  // TypeScript'i susturmak için any[] kullanıyoruz
  let userOrders: any[] = [];
  
  try {
    if (session.user.email) {
      userOrders = await getUserOrders(session.user.email);
    }
  } catch (error) {
    console.error("Siparişler yüklenirken hata:", error);
  }

  // İstatistikler - any tipi ile güvenli hesaplama
  const totalOrders = userOrders.length;
  
  const totalSpent = userOrders.reduce((sum: number, order: any) => {
    // order.total string veya number gelebilir, güvenli çeviri
    return sum + (Number(order.total) || 0);
  }, 0);

  const completedOrders = userOrders.filter((order: any) => 
    order.status === 'completed' || order.status === 'Tamamlandı'
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hesabım</h1>
            <p className="mt-1 text-sm text-gray-500">
              Hoş geldin, <span className="font-semibold text-red-600">{session.user.name}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-10">
          <div className="bg-white overflow-hidden shadow rounded-lg px-4 py-5">
            <dt className="text-sm font-medium text-gray-500">Toplam Sipariş</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{totalOrders}</dd>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg px-4 py-5">
            <dt className="text-sm font-medium text-gray-500">Toplam Harcama</dt>
            <dd className="mt-1 text-3xl font-semibold text-green-600">
              {totalSpent.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
            </dd>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg px-4 py-5">
            <dt className="text-sm font-medium text-gray-500">Tamamlanan</dt>
            <dd className="mt-1 text-3xl font-semibold text-blue-600">{completedOrders}</dd>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {userOrders.length > 0 ? (
              userOrders.map((order: any) => (
                <li key={order.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-red-600">Sipariş #{order.id}</p>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {order.orderType || 'Paket'}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>{new Date(order.createdAt).toLocaleDateString('tr-TR')}</p>
                      <p className="ml-4 font-bold text-gray-900">
                         {Number(order.total).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                      </p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-8 text-center text-gray-500">Henüz sipariş yok.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}