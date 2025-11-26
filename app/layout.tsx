import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Font importu
import AuthProvider from "../components/AuthProvider";
import { CartProvider } from "../components/CartProvider";
import Navbar from "../components/Navbar";
import GoogleAdsense from "../components/GoogleAdsense";

// HATA BURADAYDI: Bu satır eksik olduğu için 'inter' bulunamıyordu.
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Borcan Kebap - Geleneksel Türk Lezzetleri",
  description: "En lezzetli kebap, pide ve lahmacun çeşitleri. Avcılar'da hizmetinizdeyiz.",
  icons: {
    icon: '/favicon.ico',
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
        {/* Google Reklamları */}
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