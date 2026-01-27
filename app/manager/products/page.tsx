'use client';
import { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X } from 'lucide-react';

export default function ManagerProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null); // DÜZENLEME DURUMU

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/products`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingProduct),
    });
    if (res.ok) {
      setEditingProduct(null);
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-28 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-stone-900 mb-8">Ürün Yönetimi</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-stone-200">
              <img src={product.image} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="font-bold text-stone-800">{product.name}</h3>
                <p className="text-red-600 font-black mb-4">{product.price} ₺</p>
                <div className="flex gap-2">
                  {/* DÜZENLE BUTONU ARTIK AKTİF */}
                  <button 
                    onClick={() => setEditingProduct(product)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" /> Düzenle
                  </button>
                  <button className="bg-red-100 text-red-600 p-2 rounded-xl">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DÜZENLEME PENCERESİ (MODAL) */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl relative">
            <button onClick={() => setEditingProduct(null)} className="absolute top-6 right-6 text-stone-400">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-black mb-6">Ürünü Güncelle</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input 
                className="w-full p-4 bg-stone-100 rounded-2xl outline-none" 
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
              />
              <input 
                className="w-full p-4 bg-stone-100 rounded-2xl outline-none" 
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
              />
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black">
                Değişiklikleri Kaydet
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}