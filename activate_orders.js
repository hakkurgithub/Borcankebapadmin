const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

function writeUTF8(filePath, content) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(__dirname, filePath), content.trim(), { encoding: 'utf8' });
    console.log('✅ DOSYA OLUŞTURULDU: ' + filePath);
  } catch (e) { console.error('❌ HATA: ' + filePath, e); }
}

async function setupDatabase() {
  console.log('��� Veritabanı tabloları kontrol ediliyor...');
  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    // 1. ORDERS TABLOSU (Siparişin kendisi)
    await client.query(`
      CREATE TABLE IF NOT EXISTS "orders" (
        id SERIAL PRIMARY KEY,
        customer_name TEXT,
        customer_address TEXT,
        customer_phone TEXT,
        total_amount INTEGER NOT NULL,
        status TEXT DEFAULT 'Bekliyor',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. ORDER_ITEMS TABLOSU (Siparişin içindeki yemekler)
    await client.query(`
      CREATE TABLE IF NOT EXISTS "order_items" (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id),
        product_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price INTEGER NOT NULL
      );
    `);
    
    console.log('✅ Veritabanı tabloları (orders, order_items) hazır.');
  } catch (err) {
    console.error('❌ DB HATA:', err.message);
  } finally {
    await client.end();
  }
}

// === DOSYA 1: SİPARİŞİ KAYDEDEN API (BACKEND) ===
const apiRouteContent = `
import { NextResponse } from "next/server";
import { Client } from "pg";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, total, customer } = body;

    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();

    // 1. Siparişi Kaydet
    const orderRes = await client.query(
      'INSERT INTO orders (customer_name, total_amount, status) VALUES ($1, $2, $3) RETURNING id',
      [customer?.name || 'Misafir', total, 'Yeni Sipariş']
    );
    
    const orderId = orderRes.rows[0].id;

    // 2. Ürünleri Kaydet
    for (const item of items) {
      await client.query(
        'INSERT INTO order_items (order_id, product_name, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.name, item.quantity, item.price]
      );
    }

    await client.end();

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("Sipariş Hatası:", error);
    return NextResponse.json({ success: false, error: "Veritabanı hatası" }, { status: 500 });
  }
}
`;

// === DOSYA 2: GÜNCELLENMİŞ SEPET SAYFASI (FRONTEND) ===
const cartPageContent = `
"use client";

import React, { useState } from "react";
import { useCart } from "@/components/CartProvider";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // DEMO MODU KALDIRILDI -> GERÇEK SİPARİŞ FONKSİYONU
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
          customer: { name: "Web Müşterisi" } // Ilerde form eklenebilir
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Siparişiniz başarıyla alındı! Hazırlamaya başlıyoruz.");
        clearCart(); // Sepeti bosalt
        window.location.href = "/"; // Anasayfaya don
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
        <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-stone-800 mb-2">A kosár üres (Sepetiniz Boş)</h2>
        <p className="text-stone-600 mb-8">Még nem választott finomságokat.</p>
        <Link href="/menu" className="bg-red-700 text-white px-8 py-3 rounded-full font-bold hover:bg-red-800 transition-colors">
          Étlap Megtekintése (Menüye Git)
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-4 pb-20 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-12 text-stone-800 flex items-center justify-center gap-3">
        <span className="text-red-700">���</span> Kosaram (Sepetim)
      </h1>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-4 border-b border-stone-100 last:border-0">
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-stone-100">
                {item.image && (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                )}
              </div>
              
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-stone-800">{item.name}</h3>
                <p className="text-red-700 font-bold">{item.price} Ft</p>
              </div>

              <div className="flex items-center gap-3 bg-stone-50 rounded-full px-3 py-1">
                <button onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))} className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-stone-600 hover:text-red-700 font-bold">-</button>
                <span className="font-bold w-4 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-stone-600 hover:text-green-600 font-bold">+</button>
              </div>

              <button onClick={() => removeItem(item.id)} className="p-2 text-stone-400 hover:text-red-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="bg-stone-50 p-6 sm:p-10">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold text-stone-600">Toplam Tutar:</span>
            <span className="text-3xl font-bold text-red-700">{total} Ft</span>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-green-700 transition-transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? 'İşleniyor...' : '✅ Siparişi Tamamla'}
          </button>
          <p className="text-center text-sm text-stone-500 mt-4">
            Ödeme kapıda nakit veya kartla yapılabilir.
          </p>
        </div>
      </div>
    </div>
  );
}
`;

// === REKLAM KONTROLU (Layout'u Tekrar Yazalim Garanti Olsun) ===
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
  title: "Karagöz Döner | Az Ízek Címe",
  description: "Eredeti török ízek Esztergom szívében.",
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
    <html lang="hu">
      <head>
        <meta name="google-adsense-account" content="${ADSENSE_ID}" />
      </head>
      <body className={inter.className + " flex flex-col min-h-screen bg-stone-50"}>
        {/* REKLAM KODU BURADA */}
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

// Dosyalari Yaz
writeUTF8('app/api/create-order/route.ts', apiRouteContent);
writeUTF8('app/cart/page.tsx', cartPageContent);
writeUTF8('app/layout.tsx', layoutContent);

// Veritabanini Kur
setupDatabase();
