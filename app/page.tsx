'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useContent } from '../hooks/useContent';
import { useCart } from '../components/CartProvider';
import WhatsAppOrderModal from '../components/WhatsAppOrderModal';
import ReservationModal from '../components/ReservationModal';
import AdminPanel from '../components/AdminPanel';
import { adminConfig } from '../lib/admin';
import AdBanner from "../components/AdBanner";

export default function Home() {
  const { content } = useContent();
  const { addItem } = useCart();
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddToCart = (item: any) => {
    addItem({ id: item.id, name: item.name, price: item.price });
  };

  const handleAdminClick = () => {
    const password = prompt("Yönetici paneline erişim için şifreyi girin:");
    if (password === adminConfig.password) {
      setShowAdminPanel(true);
    } else {
      alert("Hatalı şifre. Lütfen tekrar deneyin.");
    }
  };

  if (!isClient) {
    return null;
  }

  const popularItems = (content.allMenuItems || []).slice(0, 4);

  const aboutText = content.aboutText || "Borcan Kebap, 1985 yılından beri geleneksel Türk mutfağının eşsiz lezzetlerini sunmaktadır. Aileden gelen 40 yıllık deneyimimizle, her yemeğimizde kaliteyi ve tazeliği hissedersiniz.";

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center text-gray-800 text-center overflow-hidden bg-white">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
            <img 
            src="https://raw.githubusercontent.com/hakkurgithub/images/main/borcan-kebap-personeli.png"
            alt="Borcan Kebap Personeli"
            className="w-full h-full object-contain opacity-90"
            />
        </div>
        
        <div className="relative z-10 p-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 font-['Pacifico'] leading-tight text-red-700">
            {content.restaurantName}
          </h1>
          <div className="flex justify-center space-x-4 mt-8">
            <Link
              href="/menu"
              className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-transform transform hover:scale-105 shadow-lg"
            >
              Menüyü Gör
            </Link>
            <button
              onClick={() => setShowReservationModal(true)}
              className="bg-white text-red-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-lg border-2 border-red-600"
            >
              Rezervasyon Yap
            </button>
          </div>
        </div>
      </section>

      {/* --- REKLAM ALANI (Hero ve Popüler Ürünler Arası) --- */}
      <div className="container mx-auto px-4 mt-8">
        <AdBanner 
            dataAdSlot="1234567890" 
            dataAdFormat="auto"
            dataFullWidthResponsive={true}
        />
      </div>
      {/* ----------------------------------------------------- */}

      {/* Popüler Ürünler */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Popüler Lezzetler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularItems.map((item: any) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative w-full h-48">
                  <div className="w-full h-full relative">
                    {item.image ? (
                        <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                            Resim Yok
                        </div>
                    )}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm flex-1">{item.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-red-600">
                      {item.price}₺
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Ekle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hakkımızda Section */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 relative h-[350px] w-full rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://raw.githubusercontent.com/hakkurgithub/images/main/hero.png"
              alt="Hakkımızda"
              fill
              className="object-contain"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">
              Hakkımızda
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {aboutText}
            </p>
            <Link
              href="/about"
              className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors shadow-md"
            >
              Daha Fazla Oku
            </Link>
          </div>
        </div>
      </section>

      {/* İletişim Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">İletişim</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
              <h3 className="text-xl font-semibold mb-2">Adres</h3>
              <p className="text-gray-700">
                {content.address}
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
              <h3 className="text-xl font-semibold mb-2">Telefon</h3>
              <p className="text-gray-700">
                {content.phone}
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
              <h3 className="text-xl font-semibold mb-2">E-posta</h3>
              <p className="text-gray-700">info@borcankebap.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modallar */}
      <ReservationModal isOpen={showReservationModal} onClose={() => setShowReservationModal(false)} />
      <WhatsAppOrderModal isOpen={showWhatsAppModal} onClose={() => setShowWhatsAppModal(false)} />
      {isClient && <AdminPanel isOpen={showAdminPanel} onClose={() => setShowAdminPanel(false)} />}
    </div>
  );
}