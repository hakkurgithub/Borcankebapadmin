import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "../components/AuthProvider";
import { CartProvider } from "../components/CartProvider";
import Navbar from "../components/Navbar";
import GoogleAdsense from "../components/GoogleAdsense";

// Font ayarı
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Borcan Kebap - Geleneksel Türk Lezzetleri",
  description: "En lezzetli kebap, pide ve lahmacun çeşitleri. Avcılar'da hizmetinizdeyiz.",
  icons: {
    icon: '/favicon.ico',
  },
  // 👇 BURAYI DÜZELTTİM:
  // Buraya script etiketi DEĞİL, sadece Google'ın verdiği kısa kod (ID) gelir.
  // Eğer elinde "google-site-verification" kodu yoksa bu kısmı boş bırakabilirsin.
  verification: {
    google: "google-site-verification=KODU_BURAYA_YAZIN_YOKSA_BOS_BIRAKIN", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {/* Google Reklam Scripti (Zaten burada var, yukarıya yazmana gerek yok) */}
        <GoogleAdsense />
        
        {/* Oturum ve Sepet Yönetimi */}
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}