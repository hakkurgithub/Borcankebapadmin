const fs = require('fs');
const path = require('path');

function writeUTF8(filePath, content) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(__dirname, filePath), content.trim(), { encoding: 'utf8' });
    console.log('✅ DOSYA ONARILDI: ' + filePath);
  } catch (e) { console.error('❌ HATA: ' + filePath, e); }
}

// 1. LAYOUT (Borcan Kebap / Türkçe Ayarlarına Dönüş)
const ADSENSE_ID = "ca-pub-1758003652328292";

const layoutContent = `
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
import { CartProvider } from "@/components/CartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Borcan Kebap | Lezzetin Adresi",
  description: "Geleneksel Türk lezzetleri, kebap ve döner çeşitleri.",
  other: {
    "google-adsense-account": "${ADSENSE_ID}"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <meta name="google-adsense-account" content="${ADSENSE_ID}" />
      </head>
      <body className={inter.className + " flex flex-col min-h-screen bg-stone-50"}>
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src={\`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}\`}
        />

        <CartProvider>
          <Navbar />
          <main className="flex-grow w-full">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
`;

// 2. SEPET SAYFASI (Türkçe'ye Dönüş)
const cartPageContent = `
"use client";

import React, { useState } from "react";
import { useCart } from "@/components/CartProvider";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items,
          total: total,
          customer: { name: "Web Müşterisi" }
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Siparişiniz başarıyla alındı! Hazırlamaya başlıyoruz.");
        clearCart();
        window.location.href = "/";
      } else {
        alert("❌ Bir hata oluştu. Lütfen telefondan arayınız.");
      }
    } catch (error) {
      console.error(error);
      alert("Bağlantı hatası!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 px-4 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Sepetiniz Boş</h2>
        <p className="text-stone-600 mb-8">Henüz bir lezzet seçmediniz.</p>
        <Link href="/menu" className="bg-red-700 text-white px-8 py-3 rounded-full font-bold hover:bg-red-800 transition-colors">
          Menüyü İncele
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-4 pb-20 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-12 text-stone-800">
        <span className="text-red-700">���</span> Sepetim
      </h1>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4 border-b border-stone-100">
            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-stone-100">
              {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
            </div>
            
            <div className="flex-grow">
              <h3 className="font-bold text-lg text-stone-800">{item.name}</h3>
              <p className="text-red-700 font-bold">{item.price} TL</p>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))} className="w-8 h-8 rounded-full bg-stone-100 font-bold">-</button>
              <span className="font-bold">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-stone-100 font-bold">+</button>
            </div>

            <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">Sil</button>
          </div>
        ))}

        <div className="pt-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold">Toplam Tutar:</span>
            <span className="text-3xl font-bold text-red-700">{total} TL</span>
          </div>

          <button onClick={handleCheckout} disabled={isSubmitting} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700">
            {isSubmitting ? 'İşleniyor...' : '✅ Siparişi Tamamla'}
          </button>
        </div>
      </div>
    </div>
  );
}
`;

writeUTF8('app/layout.tsx', layoutContent);
writeUTF8('app/cart/page.tsx', cartPageContent);

console.log('\n��� Borcan Kebap dosyaları eski haline (Türkçe) getirildi.');
