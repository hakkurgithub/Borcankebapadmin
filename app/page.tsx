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
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center text-white text-center overflow-hidden bg-gradient-to-r from-red-800 to-red-600">
        {/* Background Image */}
        <img 
          src="https://raw.githubusercontent.com/hakkurgithub/images/main/borcan-kebap-personeli.png"
          alt="Borcan Kebap Personeli"
          className="absolute inset-0 w-full h-full object-contain opacity-70"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 p-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 font-['Pacifico'] leading-tight">
            {content.restaurantName}
          </h1>
          <p className="text-lg sm:text-xl font-light mb-6">
            {content.heroTitle}
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/menu"
              className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-transform transform hover:scale-105 shadow-lg"
            >
              Menüyü Gör
            </Link>
            <button
              onClick={() => setShowReservationModal(true)}
              className="bg-white text-red-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-lg"
            >
              Rezervasyon Yap
            </button>
          </div>
        </div>
      </section>

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
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
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
                      <i className="ri-shopping-cart-fill mr-2"></i>Ekle
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
          <div className="md:w-1/2 relative h-[350px] rounded-xl overflow-hidden shadow-lg">
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
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <i className="ri-map-pin-line text-4xl text-red-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Adres</h3>
              <p className="text-gray-700">
                {content.address}
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <i className="ri-phone-line text-4xl text-red-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Telefon</h3>
              <p className="text-gray-700">
                {content.phone}
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <i className="ri-mail-line text-4xl text-red-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">E-posta</h3>
              <p className="text-gray-700">info@borcankebap.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admin ve Modallar */}
      {isClient && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <a
            href="/manager/products"
            className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
            title="Ürün Yönetimi"
          >
            <i className="ri-shopping-bag-line text-lg"></i>
          </a>
          <button
            onClick={handleAdminClick}
            className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg"
            title="Admin Paneli"
          >
            <i className="ri-admin-line text-lg"></i>
          </button>
        </div>
      )}

      <ReservationModal isOpen={showReservationModal} onClose={() => setShowReservationModal(false)} />
      <WhatsAppOrderModal isOpen={showWhatsAppModal} onClose={() => setShowWhatsAppModal(false)} />
      {isClient && <AdminPanel isOpen={showAdminPanel} onClose={() => setShowAdminPanel(false)} />}
    </div>
  );
}