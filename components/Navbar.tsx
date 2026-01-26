'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Sayacı güncelleyen fonksiyon
    const updateCount = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        const cartItems = savedCart ? JSON.parse(savedCart) : [];
        setItemCount(cartItems.length);
      } catch (e) {
        setItemCount(0);
      }
    };

    updateCount();

    // Diğer sekmelerde veya sayfa içi değişimlerde sayacı canlı tutar
    window.addEventListener('storage', updateCount);
    const interval = setInterval(updateCount, 1000); // Her saniye kontrol et (Garantici yöntem)

    return () => {
      window.removeEventListener('storage', updateCount);
      clearInterval(interval);
    };
  }, [pathname]);

  return (
    <nav className="fixed w-full z-50 bg-red-700 text-white shadow-lg h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 flex justify-between w-full items-center">
        <Link href="/" className="text-2xl font-black tracking-tighter hover:text-yellow-400 transition-colors">
          Borcan Kebap
        </Link>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/menu" className="font-bold hover:text-yellow-400 text-sm sm:text-base">Menü</Link>
          
          <Link href="/cart" className="relative bg-yellow-400 text-red-700 px-4 py-2.5 rounded-2xl flex items-center gap-2 hover:scale-105 transition-transform shadow-md">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-black text-sm hidden sm:inline">Sepetim</span>
            
            {/* KIRMIZI SAYAÇ İŞARETİ */}
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white animate-pulse shadow-lg">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}