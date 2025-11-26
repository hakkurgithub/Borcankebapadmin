"use client";

import { useState, useEffect } from "react";
import { addProduct, deleteProduct, updateProduct, getManagerProducts, toggleProductStatus } from "../../../lib/actions";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ProductForm {
  id?: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  isActive: number;
}

const initialForm: ProductForm = {
  name: "",
  description: "",
  price: "",
  category: "Kebaplar & Izgaralar",
  image: "",
  isActive: 1
};

export default function ProductsManager() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ProductForm>(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  // Güvenlik
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") loadProducts();
  }, [status, router]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getManagerProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Form Gönderme (Ekle/Düzenle)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && formData.id) {
        await updateProduct(formData.id, formData);
      } else {
        await addProduct(formData);
      }
      setIsModalOpen(false);
      setFormData(initialForm);
      setIsEditing(false);
      loadProducts();
    } catch (error) {
      alert("İşlem başarısız oldu.");
    }
  };

  // Düzenleme Modunu Aç
  const handleEdit = (item: any) => {
    setFormData({
      id: item.id,
      name: item.name,
      description: item.description || "",
      price: item.price.toString(),
      category: item.category || "Diğer",
      image: item.image || "",
      isActive: item.isActive ?? item.is_active ?? 1
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Silme
  const handleDelete = async (id: number) => {
    if (confirm("Bu ürünü tamamen silmek istediğinize emin misiniz? (Pasife alarak gizleyebilirsiniz)")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  // HIZLI DURUM DEĞİŞTİRME (Toggle)
  const handleToggle = async (item: any) => {
    const currentStatus = item.isActive ?? item.is_active ?? 1;
    await toggleProductStatus(item.id, currentStatus);
    loadProducts(); // Listeyi yenile
  };

  if (status === "loading") return <div className="p-10 text-center text-gray-500">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Başlık */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Menü Yönetimi</h1>
            <p className="text-gray-500 text-sm mt-1">Ürünleri ekleyin, düzenleyin veya görünürlüğünü değiştirin.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Link href="/manager" className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-center flex-1 md:flex-none">
              Geri Dön
            </Link>
            <button 
              onClick={() => { setIsModalOpen(true); setIsEditing(false); setFormData(initialForm); }}
              className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-bold shadow-md hover:bg-red-700 flex-1 md:flex-none text-center flex items-center justify-center gap-2"
            >
              <span>+</span> Yeni Ürün
            </button>
          </div>
        </div>

        {/* Liste */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Ürün Bilgisi</th>
                <th className="p-4 hidden md:table-cell font-semibold">Kategori</th>
                <th className="p-4 font-semibold">Fiyat</th>
                <th className="p-4 text-center font-semibold">Durum</th>
                <th className="p-4 text-right font-semibold">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((item) => {
                const isItemActive = (item.isActive ?? item.is_active ?? 1) === 1;
                return (
                  <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${!isItemActive ? 'bg-gray-50/80' : ''}`}>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0 shadow-sm">
                            {item.image ? (
                                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                            ) : <span className="text-[10px] flex items-center justify-center h-full text-gray-400 text-center leading-tight">Resim<br/>Yok</span>}
                        </div>
                        <div>
                            <span className={`font-semibold block ${!isItemActive ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                {item.name}
                            </span>
                            {!isItemActive && <span className="text-xs text-red-500 font-bold md:hidden">PASİF</span>}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium border border-blue-100">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-gray-800">{item.price} ₺</td>
                    
                    {/* DURUM TOGGLE (ANAHTAR) */}
                    <td className="p-4 text-center">
                        <button 
                            onClick={() => handleToggle(item)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                isItemActive ? 'bg-green-500 focus:ring-green-500' : 'bg-gray-300 focus:ring-gray-400'
                            }`}
                            title={isItemActive ? "Gizlemek için tıkla" : "Yayınlamak için tıkla"}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                isItemActive ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                        </button>
                        <div className="text-[10px] font-bold mt-1 text-gray-500">
                            {isItemActive ? 'YAYINDA' : 'GİZLİ'}
                        </div>
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => handleEdit(item)} className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                          Düzenle
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md text-sm transition-colors" title="Sil">
                          <i className="ri-delete-bin-line"></i> Sil
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL (Ekleme/Düzenleme) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
                {isEditing ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Ürün Adı</label>
                <input required className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all" 
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Örn: Adana Kebap" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Fiyat (₺)</label>
                    <input required type="number" step="0.01" className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all" 
                        value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="0.00" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                    <select className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all bg-white" 
                        value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                        <option>Kebaplar & Izgaralar</option>
                        <option>Pide & Lahmacun</option>
                        <option>Döner</option>
                        <option>Dürüm</option>
                        <option>Çorbalar</option>
                        <option>Tatlılar</option>
                        <option>İçecekler</option>
                        <option>Yan Ürünler</option>
                    </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Resim URL</label>
                <input type="text" className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all" 
                    value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} placeholder="https://..." />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Açıklama</label>
                <textarea className="w-full border border-gray-300 p-3 rounded-lg h-24 focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none" 
                    value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Ürün içeriği hakkında kısa bilgi..." />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors">İptal</button>
                <button type="submit" className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold shadow-lg transition-colors">Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}