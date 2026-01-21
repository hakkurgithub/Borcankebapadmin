'use client';

import { useCart } from '../../components/CartProvider';

export default function MenuButton({ product }: { product: any }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    // TypeScript hata vermemesi için veriyi CartItem tipine uygun gönderiyoruz
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
      // Eğer CartProvider 'image' kabul etmiyorsa buraya eklemiyoruz.
      // Eğer resmin sepette görünmesini istiyorsanız CartProvider içindeki tipi (type) güncellemelisiniz.
    } as any); 
    
    alert(`${product.name} sepete eklendi!`);
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 mt-auto"
    >
      <span>🛒</span>
      Sepete Ekle
    </button>
  );
}