// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Borcan Kebap</h3>
            <p className="text-gray-400 mb-4">
              1985'ten beri İstanbul'da geleneksel Türk mutfağının eşsiz lezzetlerini sunuyoruz.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/brcnkbp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <i className="ri-facebook-fill text-lg"></i>
              </a>
              <a
                href="https://www.instagram.com/borcankebap/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-full flex items-center justify-center cursor-pointer hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 transition-all"
              >
                <i className="ri-instagram-fill text-lg"></i>
              </a>
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                <i className="ri-twitter-fill text-lg"></i>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Menü
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Rezervasyon
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">İletişim</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <i className="ri-phone-line mr-2"></i>
                0212 423 3727
              </li>
              <li className="flex items-center">
                <i className="ri-phone-line mr-2"></i>
                0545 509 3462
              </li>
              <li className="flex items-center">
                <i className="ri-whatsapp-line mr-2"></i>
                0545 509 3462 (WhatsApp)
              </li>
              <li className="flex items-center">
                <i className="ri-mail-line mr-2"></i>
                info@borcankebap.com
              </li>
              <li className="flex items-start">
                <i className="ri-map-pin-line mr-2 mt-1"></i>
                <a
                  href="https://maps.app.goo.gl/rQdBMCqk5GMwdVSM7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Beyoğlu Caddesi No: 35/A
                  <br />
                  Parseller, Avcılar/İstanbul
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Çalışma Saatleri</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Pazartesi - Pazar</li>
              <li>11:00 - 23:00</li>
              <li className="text-green-400 font-semibold">Her gün açık</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 Borcan Kebap. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}