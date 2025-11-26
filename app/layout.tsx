import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "../components/AuthProvider";
import { CartProvider } from "../components/CartProvider";
import Navbar from "../components/Navbar";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Borcan Kebap - Geleneksel Türk Lezzetleri",
  description: "En lezzetli kebap, pide ve lahmacun çeşitleri. Avcılar'da hizmetinizdeyiz.",
  icons: {
    icon: '/favicon.ico',
  },
  // 👇 GOOGLE ADSENSE DOĞRULAMASI BURADA YAPILIYOR
  other: {
    "google-adsense-account": "ca-pub-1758003652328292",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        {/* Google AdSense Scripti (Yedek Olarak Kalsın, Reklam Gösterimi İçin Lazım) */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1758003652328292"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
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