// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Pacifico } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../components/CartProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] });
const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico'
});

export const metadata: Metadata = {
  title: 'Borcan Kebap - Geleneksel Türk Mutfağı',
  description: '1985\'ten beri İstanbul\'da hizmet veren Borcan Kebap\'ta geleneksel Türk mutfağının eşsiz lezzetlerini keşfedin. Adana kebap, pide, lahmacun ve daha fazlası.',
  keywords: 'borcan kebap, türk mutfağı, adana kebap, pide, lahmacun, istanbul restoran',
  robots: 'index, follow',
  openGraph: {
    title: 'Borcan Kebap - Geleneksel Türk Mutfağı',
    description: '1985\'ten beri İstanbul\'da hizmet veren Borcan Kebap\'ta geleneksel Türk mutfağının eşsiz lezzetlerini keşfedin.',
    url: 'https://borcan-kebap.com',
    siteName: 'Borcan Kebap',
    images: [
      {
        url: 'https://readdy.ai/api/search-image?query=Turkish%20restaurant%20logo%20Borcan%20Kebap%20traditional%20cuisine%20branding&width=1200&height=630&seq=og&orientation=landscape',
        width: 1200,
        height: 630,
        alt: 'Borcan Kebap'
      }
    ],
    locale: 'tr_TR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Borcan Kebap - Geleneksel Türk Mutfağı',
    description: '1985\'ten beri İstanbul\'da hizmet veren Borcan Kebap\'ta geleneksel Türk mutfağının eşsiz lezzetlerini keşfedin.',
    images: ['https://readdy.ai/api/search-image?query=Turkish%20restaurant%20logo%20Borcan%20Kebap%20traditional%20cuisine%20branding&width=1200&height=630&seq=twitter&orientation=landscape']
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.className} ${pacifico.variable}`}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <SessionProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}