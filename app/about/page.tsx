'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://raw.githubusercontent.com/hakkurgithub/images/main/Borcan-kebap-personeli.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Hakkımızda</h1>
            <p className="text-xl max-w-2xl mx-auto">40 yıllık geleneksel lezzet hikayemiz</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Story Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Hikayemiz</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                1985 yılından bu yana İstanbul&apos;un Avcılar ilçesinde hizmet veren Borcan Kebap,
                geleneksel Türk mutfağının eşsiz lezzetlerini modern sunum ile buluşturuyor. Ailemizin 40
                yıllık deneyimi ve özel tariflerimizle her lokmada otantik tatları yaşayacaksınız.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Babadan oğula geçen geleneksel tariflerin yanı sıra, günümüz damak zevkine uygun yeni lezzetler
                de menümüzde yerini alıyor. Her gün taze malzemelerle hazırlanan kebaplarımız, özel baharatlarımız
                ve mangal ateşimizin verdiği eşsiz aroma ile misafirlerimize unutulmaz bir yemek deneyimi sunuyoruz.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">40+</div>
                  <div className="text-gray-600">Yıllık Deneyim</div>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">50K+</div>
                  <div className="text-gray-600">Mutlu Müşteri</div>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">100+</div>
                  <div className="text-gray-600">Menü Çeşidi</div>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">5</div>
                  <div className="text-gray-600">Şube</div>
                </div>
              </div>
            </div>
            <div
              className="w-full h-96 bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=Traditional%20Turkish%20chef%20preparing%20kebab%20in%20authentic%20restaurant%20kitchen%2C%20skilled%20cook%20grilling%20meat%2C%20professional%20kitchen%20setup%2C%20warm%20lighting%2C%20spacious%20dining%20room%2C%20professional%20restaurant%20photography%2C%20welcoming%20atmosphere&width=600&height=400&seq=chef-about&orientation=landscape')`,
              }}
            ></div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Değerlerimiz</h2>
            <p className="text-xl text-gray-600">Bizi özel kılan değerler</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-restaurant-line text-2xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Kalite</h3>
              <p className="text-gray-600">
                Her gün taze seçilen en kaliteli malzemelerle hazırlanan yemeklerimiz,
                lezzet standartlarımızdan asla ödün vermez.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-heart-line text-2xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Geleneksellik</h3>
              <p className="text-gray-600">
                Geçmişten günümüze aktarılan geleneksel tariflerimiz ve pişirme yöntemlerimiz
                otantik lezzetlerin anahtarıdır.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-smile-line text-2xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Müşteri Memnuniyeti</h3>
              <p className="text-gray-600">
                Misafirlerimizin memnuniyeti bizim için en önemli önceliktir.
                Her müşterimizi ailemizin bir ferdi olarak görürüz.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Ekibimiz</h2>
            <p className="text-xl text-gray-600">Deneyimli ve tutkulu ekibimiz</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div
                className="w-24 h-24 bg-cover bg-center rounded-full mx-auto mb-4"
                style={{
                  backgroundImage: `url('https://raw.githubusercontent.com/hakkurgithub/images/main/erhan-deniz.jpg')`,
                }}
              ></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Erhan Deniz</h3>
              <p className="text-red-600 font-medium mb-3">Baş Aşçı</p>
              <p className="text-gray-600 text-sm">
                35 yıllık deneyimi ile geleneksel kebap ustası.
                Özel baharat karışımları ve mangal teknikleri konusunda uzman.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div
                className="w-24 h-24 bg-cover bg-center rounded-full mx-auto mb-4"
                style={{
                  backgroundImage: `url('https://raw.githubusercontent.com/hakkurgithub/images/main/faruk-deniz.jpg')`,
                }}
              ></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Faruk Deniz</h3>
              <p className="text-red-600 font-medium mb-3">Pide Ustası</p>
              <p className="text-gray-600 text-sm">
                20 yıldır pide ve lahmacun konusunda uzman.
                İnce hamur teknikleri ve geleneksel fırın kullanımında usta.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div
                className="w-24 h-24 bg-cover bg-center rounded-full mx-auto mb-4"
                style={{
                  backgroundImage: `url('https://raw.githubusercontent.com/hakkurgithub/images/main/oktay-deniz.jpg')`,
                }}
              ></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Oktay Deniz</h3>
              <p className="text-red-600 font-medium mb-3">Restoran Müdürü</p>
              <p className="text-gray-600 text-sm">
                15 yıldır misafir ağırlama konusunda uzman.
                Müşteri memnuniyeti ve servis kalitesi sorumlusu.
              </p>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Konumumuz</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                İstanbul&apos;un Avcılar ilçesinde, Beyoğlu Caddesinde yer alan restoranımız
                kolay ulaşım imkanları ile misafirlerini ağırlıyor. Geniş ve ferah salonumuz
                120 kişilik kapasitesi ile aileniz ve arkadaşlarınızla keyifli vakit geçirmeniz
                için ideal bir ortam sunuyor.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-map-pin-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Adres</h4>
                    <p className="text-gray-600">Beyoğlu Caddesi No: 35/A, Parseller, Avcılar/İstanbul</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-car-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Park Yeri</h4>
                    <p className="text-gray-600">Ücretsiz müşteri park alanı mevcut</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-user-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Kapasite</h4>
                    <p className="text-gray-600">120 kişilik salon, grup rezervasyonları mevcut</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-full h-96 bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20Turkish%20restaurant%20interior%20dining%20area%2C%20elegant%20tables%20and%20chairs%20setup%2C%20warm%20ambient%20lighting%2C%20spacious%20dining%20room%2C%20professional%20restaurant%20photography%2C%20welcoming%20atmosphere&width=600&height=400&seq=restaurant-interior&orientation=landscape')`,
              }}
            ></div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="mb-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Ödüllerimiz ve Sertifikalarımız</h2>
            <p className="text-xl text-red-100">Kalitemizin tescili</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/10 rounded-lg">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-award-line text-2xl text-yellow-800"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">2023 Lezzet Ödülü</h3>
              <p className="text-red-100 text-sm">İstanbul Gastronomi Derneği tarafından verilen en iyi kebap ödülü</p>
            </div>

            <div className="text-center p-6 bg-white/10 rounded-lg">
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-2xl text-green-800"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Hijyen Sertifikası</h3>
              <p className="text-red-100 text-sm">Sağlık Bakanlığı onaylı A+ hijyen ve gıda güvenliği sertifikası</p>
            </div>

            <div className="text-center p-6 bg-white/10 rounded-lg">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-star-line text-2xl text-blue-800"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">5 Yıldız Değerlendirme</h3>
              <p className="text-red-100 text-sm">TripAdvisor ve Google&apos;da 4.8+ puan ile mükemmellik sertifikası</p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="ri-target-line text-xl text-red-600"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Misyonumuz</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Geleneksel Türk mutfağının eşsiz lezzetlerini, modern sunum teknikleri ile birleştirerek
                misafirlerimize unutulmaz bir gastronomi deneyimi sunmak. Her tabakta otantik tatları
                yaşatırken, kalite ve hijyen standartlarımızdan asla ödün vermemek.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="ri-eye-line text-xl text-red-600"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Vizyonumuz</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Türk mutfağını en iyi temsil eden, ulusal ve uluslararası alanda tanınan,
                geleneksel lezzetlerin koruyucusu ve yenilikçi sunum tekniklerinin öncüsü
                bir restoran zinciri olmak. Gelecek nesillere bu değerli mirası aktarmak.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-lg border-2 border-black">
                  BK
                </div>
                <span className="font-[`Pacifico`]">Borcan Kebap</span>
              </h3>
              <p className="text-gray-400 mb-4">
                Geleneksel Türk mutfağının eşsiz lezzetlerini modern sunum ile buluşturuyoruz.
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
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                  <i className="ri-twitter-fill text-sm"></i>
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
              <h4 className="text-lg font-semibold mb-4">Online Sipariş</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.yemeksepeti.com/restaurant/kw28/borcan-kebap-pide-lahmacun-salonu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center"
                  >
                    <i className="ri-restaurant-line mr-2 text-orange-600"></i>
                    Yemeksepeti
                  </a>
                </li>
                <li>
                  <a
                    href="https://getir.com/yemek/restoran/borcan-kebap-pide-lahmacun-salonu-mustafa-kemalpasa-mah-avcilar-istanbul/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center"
                  >
                    <i className="ri-truck-line mr-2 text-orange-600"></i>
                    Getir
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.trendyol.com/yemek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center"
                  >
                    <i className="ri-restaurant-line mr-2 text-purple-600"></i>
                    Trendyol Yemek
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/905455093462?text=Merhaba!%20Borcan%20Kebap&apos;tan%20sipariş%20vermek%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center"
                  >
                    <i className="ri-whatsapp-line mr-2 text-green-600"></i>
                    WhatsApp
                  </a>
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
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Borcan Kebap. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}