import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
import { CartProvider } from "@/components/CartProvider";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Borcan Kebap | Lezzetin Adresi",
  description: "Geleneksel Türk lezzetleri, kebap ve döner çeşitleri.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <head>
        {/* Google AdSense Doğrulama ve Reklam Kodu */}
        <meta name="google-adsense-account" content="ca-pub-1758003652328292" />
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1758003652328292"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className + " flex flex-col min-h-screen bg-stone-50"}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-grow w-full">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}