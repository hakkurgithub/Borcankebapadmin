"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { useContent } from "../hooks/useContent";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle, ShoppingCart, User, Settings, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { content } = useContent();
  const { getTotalItems } = useCart();
  const { data: session } = useSession();
  const [itemCount, setItemCount] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const count = getTotalItems();
    if (count !== itemCount) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
      setItemCount(count);
    }
  }, [getTotalItems, itemCount]);

  const phoneNumber = content.phone.replace(/[^0-9]/g, "");
  const whatsappMessage = encodeURIComponent("Merhaba, ben Borcan Kebap internet sitesinden size ulaşıyorum, sipariş vermek istiyorum.");

  return (
    <>
      <nav className="bg-red-700 text-white py-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link
            href="/"
            className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition"
          >
            {content.restaurantName}
          </Link>

          {/* Desktop Menü */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink href="/" label="Ana Sayfa" active={pathname === "/"} />
            <NavLink href="/menu" label="Menü" active={pathname === "/menu"} />
            <NavLink href="/about" label="Hakkımızda" active={pathname === "/about"} />
            <NavLink href="/contact" label="İletişim" active={pathname === "/contact"} />

            <Link
              href="/cart"
              className={`relative bg-yellow-400 text-red-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition flex items-center gap-2 ${
                animate ? "scale-110 transition-transform" : ""
              }`}
            >
              <ShoppingCart size={20} />
              <span>Sepetim</span>
              {itemCount > 0 && (
                <span className="bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {session?.user && (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-red-600 transition-colors border border-red-500"
                >
                  <User size={20} />
                  <span className="text-sm font-medium">{session.user.name?.split(' ')[0]}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-xl border py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b bg-gray-50">
                      <p className="text-sm font-bold text-gray-800">{session.user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                    </div>
                    
                    {(session.user as any).role === 'manager' && (
                      <Link
                        href="/manager"
                        className="flex items-center space-x-2 px-4 py-3 hover:bg-red-50 text-red-600 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings size={18} />
                        <span className="text-sm font-medium">Yönetim Paneli</span>
                      </Link>
                    )}
                    
                    <Link
                      href="/api/auth/signout"
                      className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-100 transition-colors text-gray-700"
                    >
                      <LogOut size={18} />
                      <span className="text-sm">Çıkış Yap</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobil Menü Butonu */}
          <button
            className="md:hidden text-white text-3xl focus:outline-none p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobil Açılır Menü */}
        {menuOpen && (
          <div className="md:hidden bg-red-800 text-white px-4 py-6 space-y-4 absolute w-full shadow-xl border-t border-red-600 h-screen z-40">
            <MobileLink href="/" label="Ana Sayfa" setMenuOpen={setMenuOpen} />
            <MobileLink href="/menu" label="Menü" setMenuOpen={setMenuOpen} />
            <MobileLink href="/about" label="Hakkımızda" setMenuOpen={setMenuOpen} />
            <MobileLink href="/contact" label="İletişim" setMenuOpen={setMenuOpen} />
            
            {session?.user && (
               <div className="pt-4 border-t border-red-600 mt-4">
                  <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="bg-red-900 p-2 rounded-full"><User size={20} /></div>
                    <div>
                      <p className="text-sm font-bold">{session.user.name}</p>
                      <p className="text-xs text-red-200">Yönetici</p>
                    </div>
                  </div>
                  
                  {(session.user as any).role === 'manager' && (
                    <Link 
                      href="/manager" 
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 bg-white text-red-700 p-3 rounded-lg font-bold mb-3"
                    >
                      <Settings size={20} /> Yönetim Paneli
                    </Link>
                  )}

                  <Link 
                    href="/api/auth/signout" 
                    className="flex items-center gap-2 text-red-200 p-2 hover:text-white"
                  >
                    <LogOut size={18} /> Çıkış Yap
                  </Link>
               </div>
            )}
          </div>
        )}
      </nav>

      {/* HAREKETLİ MOBİL BUTONLAR - Google Politikası gereği menü açıkken gizlendi */}
      {!menuOpen && (
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50 md:hidden pointer-events-none">
          <a
            href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center border-2 border-white hover:bg-green-600 transition-transform hover:scale-110 active:scale-95"
          >
            <MessageCircle size={28} />
          </a>

          <Link
            href="/cart"
            className={`pointer-events-auto bg-yellow-400 text-red-900 p-4 rounded-full shadow-2xl flex items-center justify-center border-2 border-white transition-all hover:scale-110 active:scale-95 ${
               animate ? "scale-125 bg-yellow-300" : ""
            }`}
          >
            <div className="relative">
              <ShoppingCart size={28} />
              {itemCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-yellow-400 shadow-sm">
                  {itemCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

// Yardımcı Bileşenler Değişmedi
function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`hover:text-yellow-300 transition px-3 py-2 rounded-md ${
        active ? "bg-red-800 text-yellow-300 font-semibold" : ""
      }`}
    >
      {label}
    </Link>
  );
}

function MobileLink({ href, label, setMenuOpen }: { href: string; label: string; setMenuOpen: (open: boolean) => void }) {
  return (
    <Link
      href={href}
      onClick={() => setMenuOpen(false)}
      className="block text-lg font-medium hover:text-yellow-300 transition py-2 px-2 rounded hover:bg-red-800"
    >
      {label}
    </Link>
  );
}