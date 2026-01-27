'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [itemCount, setItemCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Menü linklerini buraya ekliyoruz
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
        {/* LOGO */}
        <Link href="/" className="text-2xl font-black tracking-tighter hover:text-yellow-400 transition-colors">
          Borcan Kebap
        </Link>
        
        {/* MASAÜSTÜ LİNKLER */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`font-bold hover:text-yellow-400 transition-colors ${pathname === link.href ? 'text-yellow-400' : 'text-white'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* SAĞ TARAF: SEPET VE MOBİL MENÜ BUTONU */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative bg-yellow-400 text-red-700 px-4 py-2.5 rounded-2xl flex items-center gap-2 hover:scale-105 transition-transform shadow-md">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-black text-sm hidden sm:inline">Sepetim</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white animate-pulse shadow-lg">
                {itemCount}
              </span>
            )}
          </Link>

          {/* MOBİL MENÜ BUTONU */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-red-800 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBİL MENÜ PANELİ */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-red-800 p-4 flex flex-col gap-4 md:hidden shadow-xl border-t border-red-900">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-bold py-2 border-b border-red-700 last:border-0"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}