'use client';

export default function MenuButton({ product }: { product: any }) {
  const addToCart = () => {
    try {
      // 1. Mevcut sepeti yerel hafızadan (localStorage) çek
      const currentData = localStorage.getItem('cart');
      const currentCart = currentData ? JSON.parse(currentData) : [];
      
      // 2. Yeni ürünü ekle (Sunucuya gitmeden, anında!)
      const updatedCart = [...currentCart, { 
        id: product.id || Date.now(), 
        name: product.name, 
        price: product.price, 
        quantity: 1 
      }];
      
      // 3. Hafızaya geri yaz
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      // 4. Kullanıcıyı bilgilendir ve sayfayı yenile (Sepet ikonunun güncellenmesi için)
      alert(`${product.name} sepete eklendi!`);
      window.location.reload(); 
    } catch (error) {
      console.error("Sepet hatasi:", error);
    }
  };

  return (
    <button 
      onClick={addToCart}
      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
    >
      <span>🛒</span>
      Sepete Ekle
    </button>
  );
}