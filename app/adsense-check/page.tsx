'use client';
import { useEffect, useState } from 'react';

export default function AdSenseCheck() {
  const [status, setStatus] = useState<any>({
    scriptLoaded: false,
    adBlockerActive: false,
    insElementFound: false,
    adsbygoogleObject: false,
    adHeight: 0
  });

  useEffect(() => {
    const checkAdSense = () => {
      if (typeof window === 'undefined') return;

      const adsScript = document.querySelector('script[src*="adsbygoogle.js"]');
      const insElement = document.querySelector('ins.adsbygoogle');
      const adRect = insElement?.getBoundingClientRect();
      
      // TypeScript hatasını önlemek için (window as any) kullanıyoruz
      const adsObj = (window as any).adsbygoogle;

      setStatus({
        scriptLoaded: !!adsScript,
        adBlockerActive: !adsObj,
        insElementFound: !!insElement,
        adsbygoogleObject: !!adsObj,
        adHeight: adRect ? adRect.height : 0
      });
    };

    const timer = setTimeout(checkAdSense, 3000); // 3 saniye bekle
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 pt-32 px-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-[32px] shadow-xl border border-stone-200">
        <h1 className="text-2xl font-black text-stone-900 mb-6 border-b pb-4 text-center">
          AdSense Teşhis Paneli
        </h1>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-stone-100 rounded-2xl">
            <span className="font-bold">Script Yüklendi mi?</span>
            <span className={status.scriptLoaded ? "text-green-600 font-black" : "text-red-600 font-black"}>
              {status.scriptLoaded ? "EVET ✅" : "HAYIR ❌"}
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-stone-100 rounded-2xl">
            <span className="font-bold">Google Nesnesi Hazır mı?</span>
            <span className={status.adsbygoogleObject ? "text-green-600 font-black" : "text-red-600 font-black"}>
              {status.adsbygoogleObject ? "EVET ✅" : "HAYIR ❌"}
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-stone-100 rounded-2xl">
            <span className="font-bold">Reklam Alanı Var mı?</span>
            <span className={status.insElementFound ? "text-green-600 font-black" : "text-red-600 font-black"}>
              {status.insElementFound ? "EVET ✅" : "HAYIR ❌"}
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-stone-100 rounded-2xl">
            <span className="font-bold">Reklam Alanı Yüksekliği:</span>
            <span className="text-blue-600 font-black">{status.adHeight} px</span>
          </div>
        </div>

        <div className="mt-8 p-6 bg-stone-50 rounded-2xl border border-stone-100 text-sm italic text-stone-500">
          Not: Eğer yükseklik 0px ise, Google reklam alanını tanıyor ama henüz uygun reklam göndermiyor demektir.
        </div>
      </div>
    </div>
  );
}