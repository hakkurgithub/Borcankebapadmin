// app/profile/page.tsx
import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";
import { getUserOrders } from "../../lib/products";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session) {
    redirect("/api/auth/signin");
  }

  // DÜZELTME: TypeScript tip hatasını (string -> number) 'as any' ile geçiyoruz
  const orders = await getUserOrders(session.user.id as any);
  const totalSpent = orders.reduce((sum: number, order: any) => sum + order.totalPrice, 0);
  const loyaltyPoints = orders.length * 10;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profilim</h1>
        <p className="text-gray-600 mt-1">Hesap bilgilerinizi ve istatistiklerinizi görüntüleyin</p>
      </div>

      {/* Profile Info */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{session.user.name}</h2>
            <p className="text-gray-600">{session.user.email}</p>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mt-2">
              {session.user.role === 'b2b' ? 'B2B Müşteri' : 'Standart Müşteri'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900 mb-1">{orders.length}</div>
            <div className="text-sm text-gray-600">Toplam Sipariş</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ₺{(totalSpent / 100).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Toplam Harcama</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900 mb-1">{loyaltyPoints}</div>
            <div className="text-sm text-gray-600">Sadakat Puanı</div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hesap Ayarları</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <h4 className="font-medium text-gray-900">E-posta Bildirimleri</h4>
              <p className="text-sm text-gray-600">Sipariş durumu ve kampanya bilgileri</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <h4 className="font-medium text-gray-900">SMS Bildirimleri</h4>
              <p className="text-sm text-gray-600">Sipariş hazır olduğunda SMS al</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex justify-between items-center py-3">
            <div>
              <h4 className="font-medium text-gray-900">Pazarlama İletişimi</h4>
              <p className="text-sm text-gray-600">Özel teklifler ve kampanyalar</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Loyalty Program */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl">⭐</span>
          <h3 className="text-lg font-semibold text-gray-900">Sadakat Programı</h3>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Mevcut Puanınız</span>
            <span className="text-sm font-bold text-gray-900">{loyaltyPoints} puan</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((loyaltyPoints % 100), 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Bir sonraki seviye için {100 - (loyaltyPoints % 100)} puan kaldı
          </p>
        </div>

        <div className="text-sm text-gray-700">
          <p className="mb-2">🎁 Her sipariş için 10 puan kazanın</p>
          <p className="mb-2">🍽️ 100 puan = ₺10 indirim</p>
          <p>🎂 Doğum günü ayınızda %20 ekstra puan</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-4">
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Profili Düzenle
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
          Şifre Değiştir
        </button>
        <Link 
          href="/api/auth/signout" 
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Çıkış Yap
        </Link>
      </div>
    </div>
  );
}