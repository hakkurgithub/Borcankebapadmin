'use client';

export default function MenuButton({ product }: { product: any }) {
  const addToCart = () => {
    try {
      // Yerel hafızayı oku
      const currentData = localStorage.getItem('cart');
      const currentCart = currentData ? JSON.parse(currentData) : [];
      
      // Yeni ürünü ekle
      const updatedCart = [...currentCart, { 
        id: product.id || Date.now(), 
        name: product.name, 
        price: product.price, 
        quantity: 1 
      }];
      
      // Kaydet
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      // Navbar sayacının güncellenmesi için sayfayı yenile
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