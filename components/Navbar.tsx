'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu as MenuIcon, X, Phone } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  // SEPET SAYACINI GÜNCELLEYEN KRİTİK KISIM
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
    // Sayfa her yüklendiğinde hafızayı tekrar kontrol et
  }, []);

  const navLinks = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Menü', href: '/menu' },
    { name: 'Hakkımızda', href: '/about' },
    { name: 'İletişim', href: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-red-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-black tracking-tighter group-hover:text-yellow-400 transition-colors">
              Borcan Kebap
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-bold transition-all hover:text-yellow-400 ${
                  pathname === link.href ? 'text-yellow-400' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link href="/cart" className="relative group bg-yellow-400 text-red-700 p-3 rounded-2xl hover:scale-105 transition-transform flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              <span className="font-black text-sm">Sepetim</span>
              {/* KIRMIZI İŞARET BURADA GÖRÜNECEK */}
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shadow-md border-2 border-red-600 animate-bounce">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}