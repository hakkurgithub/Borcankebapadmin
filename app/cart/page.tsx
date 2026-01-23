'use client';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  const handleWhatsAppOrder = () => {
    const message = cart.map(item => `- ${item.name} (${item.quantity} Adet) - ${item.price * item.quantity} TL`).join('%0A');
    const finalMessage = `*Yeni Sipariş (Borcan Kebap)*%0A%0A${message}%0A%0A*Toplam Tutar: ${totalPrice} TL*`;
    const waUrl = `https://wa.me/905455093462?text=Merhaba! Borcan Kebap'tan sipariş vermek istiyorum.%0A%0A${finalMessage}`;
    window.open(waUrl, '_blank');
  };

  if (cart.length === 0) return <div className="pt-32 text-center text-xl font-bold text-gray-500">Sepetiniz boş.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 border-b pb-4">Sepetim</h1>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-6 border-b pb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
              <p className="text-red-600 font-bold">{item.price} TL</p>
            </div>
            <div className="flex items-center gap-4">
              <input 
                type="number" 
                min="1"
                value={item.quantity} 
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="w-16 border rounded p-1 text-center"
              />
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 font-bold hover:text-red-700">Sil</button>
            </div>
          </div>
        ))}
        <div className="text-right mt-8 border-t pt-6">
          <p className="text-2xl font-bold mb-6 text-gray-800">Toplam: <span className="text-red-600">{totalPrice} TL</span></p>
          <button 
            onClick={handleWhatsAppOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl text-xl shadow-lg transition-transform active:scale-95"
          >
            Siparişi WhatsApp ile Tamamla
          </button>
        </div>
      </div>
    </div>
  );
}
