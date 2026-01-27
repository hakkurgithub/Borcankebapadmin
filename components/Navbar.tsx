'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [itemCount, setItemCount] = useState(0);

  // Gösterilecek tüm linkler burada
  const navLinks = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Menü', href: '/menu' },
    { name: 'Hakkımızda', href: '/about' },
    { name: 'İletişim', href: '/contact' },
    { name: 'Rezervasyon', href: '/reservation' },
  ];

  useEffect(() => {
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
    window.addEventListener('storage', updateCount);
    const interval = setInterval(updateCount, 1000);

    return () => {
      window.removeEventListener('storage', updateCount);
      clearInterval(interval);
    };
  }, [pathname]);

  return (
    <nav className="fixed w-full z-50 bg-red-700 text-white shadow-lg h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 flex justify-between w-full items-center">
        
        {/* SOL: LOGO */}
        <Link href="/" className="text-xl lg:text-2xl font-black tracking-tighter hover:text-yellow-400 transition-colors shrink-0">
          Borcan Kebap
        </Link>
        
        {/* ORTA: TÜM LİNKLER (Artık asla gizlenmez) */}
        <div className="flex items-center gap-3 lg:gap-6 overflow-x-auto no-scrollbar">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`font-bold text-[12px] lg:text-[15px] hover:text-yellow-400 transition-colors whitespace-nowrap ${pathname === link.href ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-white'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* SAĞ: SEPET BUTONU */}
        <div className="shrink-0 ml-2">
          <Link href="/cart" className="relative bg-yellow-400 text-red-700 px-3 py-2 rounded-xl flex items-center gap-2 hover:scale-105 transition-transform shadow-md">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-black text-xs hidden md:inline">Sepetim</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
}