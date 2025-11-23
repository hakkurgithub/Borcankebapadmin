"use client";

import { useState, useEffect } from "react";
import { addProduct, deleteProduct, updateProduct, getManagerProducts } from "../../../lib/actions";
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
  isActive: number; // 1: Aktif, 0: Pasif
}

const initialForm: ProductForm = {
  name: "",
  description: "",
  price: "",
  category: "Kebaplar & Izgaralar",
  image: "",
  isActive: 1 // Varsayılan olarak aktif
};

export default function ProductsManager() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ProductForm>(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  // İstemci tarafı güvenlik kontrolü (Middleware'e ek olarak)
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      loadProducts();
    }
  }, [status]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing && formData.id) {
        await updateProduct(formData.id, formData);
        alert("Ürün başarıyla güncellendi! ✅");
      } else {
        await addProduct(formData);
        alert("Yeni ürün eklendi! 🎉");
      }
      
      setIsModalOpen(false);
      setFormData(initialForm);
      setIsEditing(false);
      loadProducts();
    } catch (error) {
      alert("İşlem sırasında bir hata oluştu!");
    }
  };

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

  const handleDelete = async (id: number) => {
    if (confirm("Bu ürünü menüden tamamen silmek istediğinize emin misiniz? (Pasife almak için düzenle diyebilirsiniz)")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  if (status === "loading") return <div className="p-10 text-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Menü Yönetimi</h1>
            <p className="text-gray-500">Ürünleri ekleyin, düzenleyin veya yayından kaldırın.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Link href="/manager" className="px-4 py-2 border bg-white rounded-lg text-gray-700 text-center flex-1 md:flex-none hover:bg-gray-50">
              Geri Dön
            </Link>
            <button 
              onClick={() => { setIsModalOpen(true); setIsEditing(false); setFormData(initialForm); }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold shadow flex-1 md:flex-none hover:bg-green-700 text-center"
            >
              + Yeni Ürün
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600 border-b">
              <tr>
                <th className="p-4">Ürün</th>
                <th className="p-4 hidden md:table-cell">Kategori</th>
                <th className="p-4">Fiyat</th>
                <th className="p-4 hidden md:table-cell">Durum</th>
                <th className="p-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((item) => (
                <tr key={item.id} className={`hover:bg-gray-50 transition ${item.isActive === 0 || item.is_active === 0 ? 'bg-red-50' : ''}`}>
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                        {item.image ? (
                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                        ) : <span className="text-xs flex items-center justify-center h-full text-gray-400">Yok</span>}
                    </div>
                    <div>
                        <span className="font-medium text-gray-900 block">{item.name}</span>
                        {(item.isActive === 0 || item.is_active === 0) && (
                            <span className="text-xs text-red-500 font-bold md:hidden"> (PASİF)</span>
                        )}
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium border border-blue-100">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-gray-800">{item.price} ₺</td>
                  
                  {/* DURUM SÜTUNU */}
                  <td className="p-4 hidden md:table-cell">
                    {(item.is_active === 1 || item.isActive === 1) ? (
                      <span className="text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span> YAYINDA
                      </span>
                    ) : (
                      <span className="text-red-700 bg-red-100 px-2 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1">
                        <span className="w-2 h-2 bg-red-600 rounded-full"></span> GİZLİ
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleEdit(item)} className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-100 font-medium transition">
                        Düzenle
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-600 px-2 py-1 text-sm transition" title="Tamamen Sil">
                        <i className="ri-delete-bin-line"></i> Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">{isEditing ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* AKTİF / PASİF SEÇİMİ */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <label className="block text-sm font-bold text-gray-700 mb-2">Ürün Durumu</label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio" 
                            name="status" 
                            checked={formData.isActive === 1} 
                            onChange={() => setFormData({...formData, isActive: 1})}
                            className="w-4 h-4 text-green-600"
                        />
                        <span className="text-sm font-medium text-green-700">Aktif (Menüde Görünür)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio" 
                            name="status" 
                            checked={formData.isActive === 0} 
                            onChange={() => setFormData({...formData, isActive: 0})}
                            className="w-4 h-4 text-red-600"
                        />
                        <span className="text-sm font-medium text-red-700">Pasif (Gizli)</span>
                    </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı</label>
                <input required className="w-full border p-2 rounded focus:ring-2 focus:ring-red-500 outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (₺)</label>
                    <input required type="number" step="0.01" className="w-full border p-2 rounded focus:ring-2 focus:ring-red-500 outline-none" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <select className="w-full border p-2 rounded focus:ring-2 focus:ring-red-500 outline-none" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Resim URL</label>
                <input type="text" placeholder="https://..." className="w-full border p-2 rounded focus:ring-2 focus:ring-red-500 outline-none" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                <textarea className="w-full border p-2 rounded h-20 focus:ring-2 focus:ring-red-500 outline-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 border rounded hover:bg-gray-50 font-medium">İptal</button>
                <button type="submit" className="flex-1 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-bold">Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}