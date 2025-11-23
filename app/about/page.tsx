import Image from "next/image";
import AdBanner from "../../components/AdBanner";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pb-12">
      {/* Hero Bölümü */}
      <div className="relative h-[300px] w-full bg-red-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Image
          src="https://raw.githubusercontent.com/hakkurgithub/images/main/hero.png"
          alt="Borcan Kebap Hakkımızda"
          fill
          className="object-cover opacity-60"
        />
        <h1 className="relative z-20 text-4xl md:text-5xl font-bold text-white tracking-wider">
          HİKAYEMİZ
        </h1>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* İçerik Bölümü */}
        <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
          <div className="bg-red-50 p-8 rounded-2xl border-l-4 border-red-600 shadow-sm">
            <h2 className="text-2xl font-bold text-red-700 mb-4">Lezzetin Adresi: Borcan Kebap</h2>
            <p>
              Yılların getirdiği tecrübe ve ustalığı, en taze malzemelerle buluşturarak sofralarınıza getiriyoruz. 
              Borcan Kebap olarak amacımız sadece karnınızı doyurmak değil, damaklarınızda unutulmaz bir iz bırakmaktır.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">🔥 Ustalık ve Gelenek</h3>
              <p>
                Ocak başındaki ateşin harı, etin en kalitelisi ve baharatın en doğalı... 
                Geleneksel yöntemlerden şaşmadan, modern hijyen standartlarında hazırladığımız kebaplarımız, 
                şehrin en iddialı lezzetleri arasında yer alıyor.
              </p>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
               <Image 
                 src="https://raw.githubusercontent.com/hakkurgithub/images/main/urfa-porsiyon.jpg" 
                 alt="Ustalık" 
                 fill 
                 className="object-cover"
               />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
             <div className="relative h-64 rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
               <Image 
                 src="https://raw.githubusercontent.com/hakkurgithub/images/main/beyti-sarma.jpg" 
                 alt="Misafirperverlik" 
                 fill 
                 className="object-cover"
               />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-bold text-gray-900 mb-2">🍅 Tazelik Garantisi</h3>
              <p>
                Mutfağımıza giren her sebze günlük, her et özenle seçilmiştir. 
                Dondurulmuş ürün kullanmıyor, günlük hazırladığımız mezelerimiz ve sıcacık lavaşımızla 
                sizlere gerçek bir ziyafet sunuyoruz.
              </p>
            </div>
          </div>
        </div>

        {/* REKLAM ALANI - (İşte burası doğru yer!) */}
        <div className="mt-12">
            <AdBanner 
              dataAdSlot="0987654321" 
              dataAdFormat="auto" 
              dataFullWidthResponsive={true} 
            />
        </div>
      </div>
    </div>
  );
}