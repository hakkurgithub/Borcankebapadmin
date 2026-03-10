'use client';
import { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X, EyeOff } from 'lucide-react';

export default function ManagerProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Önbellek Kırıcı (Cache Buster) ile Veri Çekme
  const fetchProducts = () => {
    fetch(`/api/products?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenEdit = (product: any) => {
    setIsAdding(false);
    setFormData(product);
    setModalOpen(true);
  };

  const handleOpenAdd = () => {
    setIsAdding(true);
    // Yeni eklerken formun başlangıç değerleri
    setFormData({ name: '', price: '', image: '', isActive: true });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = '/api/products';
    const method = isAdding ? 'POST' : 'PUT';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setModalOpen(false);
      fetchProducts(); // Sayfayı yenilemeden listeyi anında günceller
    } else {
      alert('İşlem sırasında bir hata oluştu. Veritabanı bağlantınızı veya API dosyanızı kontrol edin.');
    }
  };

  const handleDelete = async (id: string | number) => {
    if(!window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
    
    const res = await fetch(`/api/products?id=${id}`, {
      method: 'DELETE',
    });
    
    if (res.ok) {
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-28 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Üst Kısım: Başlık ve Yeni Ekle Butonu */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-black text-stone-900">Ürün Yönetimi</h1>
          <button 
            onClick={handleOpenAdd}
            className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-green-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" /> Yeni Ürün Ekle
          </button>
        </div>
        
        {/* Ürün Listesi */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className={`bg-white rounded-[24px] overflow-hidden shadow-sm border ${product.isActive === false ? 'border-red-300 opacity-75' : 'border-stone-200'} relative transition-all`}>
              
              {/* Pasif Rozeti */}
              {product.isActive === false && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg z-10">
                  <EyeOff className="w-3 h-3" /> Pasif
                </div>
              )}

              {/* Görsel Yoksa Silicon Campus Logosu Göster */}
              <img src={product.image || 'https://raw.githubusercontent.com/hakkurgithub/images/main/silicon-campus-logo.jpg'} alt={product.name} className="w-full h-48 object-cover" />
              
              <div className="p-5">
                <h3 className="font-bold text-stone-800">{product.name}</h3>
                <p className="text-red-600 font-black mb-4">{product.price} ₺</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleOpenEdit(product)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" /> Düzenle
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-50 text-red-600 p-2 rounded-xl hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DÜZENLEME VE EKLEME PENCERESİ (MODAL) */}
      {modalOpen && formData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-6 right-6 text-stone-400 hover:text-stone-900 transition-colors">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-black mb-6">
              {isAdding ? 'Yeni Ürün Ekle' : 'Ürünü Güncelle'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Ürün Adı */}
              <div>
                <label className="text-xs font-bold text-stone-500 mb-1 block">Ürün Adı</label>
                <input 
                  required
                  className="w-full p-4 bg-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition-all" 
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              {/* Fiyat */}
              <div>
                <label className="text-xs font-bold text-stone-500 mb-1 block">Fiyat (₺)</label>
                <input 
                  required
                  type="number"
                  className="w-full p-4 bg-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition-all" 
                  value={formData.price || ''}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>

              {/* YENİ EKLENEN: Görsel Linki */}
              <div>
                <label className="text-xs font-bold text-stone-500 mb-1 block">Görsel Linki (URL)</label>
                <input 
                  type="url"
                  placeholder="https://... (Örn: İnternetteki resim linki)"
                  className="w-full p-4 bg-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm" 
                  value={formData.image || ''}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
              </div>

              {/* Aktif/Pasif Seçeneği */}
              <div className="flex items-center justify-between bg-stone-100 p-4 rounded-2xl mt-2">
                <label className="font-bold text-stone-700 cursor-pointer select-none">Sitede Göster (Aktif)</label>
                <input 
                  type="checkbox" 
                  className="w-6 h-6 accent-blue-600 cursor-pointer"
                  checked={formData.isActive !== false}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all active:scale-95 mt-4 shadow-lg shadow-blue-200">
                {isAdding ? 'Ürünü Ekle' : 'Değişiklikleri Kaydet'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}