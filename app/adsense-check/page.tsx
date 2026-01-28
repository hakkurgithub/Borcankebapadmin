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
      const adsScript = document.querySelector('script[src*="adsbygoogle.js"]');
      const insElement = document.querySelector('ins.adsbygoogle');
      const adRect = insElement?.getBoundingClientRect();

      setStatus({
        scriptLoaded: !!adsScript,
        adBlockerActive: typeof window !== 'undefined' && !window.adsbygoogle,
        insElementFound: !!insElement,
        adsbygoogleObject: !!(window as any).adsbygoogle,
        adHeight: adRect ? adRect.height : 0
      });
    };

    setTimeout(checkAdSense, 2000); // 2 saniye sonra kontrol et
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 pt-32 px-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-[32px] shadow-xl border border-stone-200">
        <h1 className="text-2xl font-black text-stone-900 mb-6 border-b pb-4">Borcan Kebap AdSense Teşhis Paneli</h1>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-stone-100 rounded-2xl">
            <span className="font-bold">AdSense Script Yüklendi mi?</span>
            <span className={status.scriptLoaded ? "text-green-600 font-black" : "text-red-600 font-black"}>
              {status.scriptLoaded ? "EVET ✅" : "HAYIR ❌"}
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-stone-100 rounded-2xl">
            <span className="font-bold">adsbygoogle Nesnesi Hazır mı?</span>
            <span className={status.adsbygoogleObject ? "text-green-600 font-black" : "text-red-600 font-black"}>
              {status.adsbygoogleObject ? "EVET ✅" : "HAYIR ❌"}
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-stone-100 rounded-2xl">
            <span className="font-bold">Reklam Alanı Mevcut mu?</span>
            <span className={status.insElementFound ? "text-green-600 font-black" : "text-red-600 font-black"}>
              {status.insElementFound ? "EVET ✅" : "HAYIR ❌"}
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-stone-100 rounded-2xl">
            <span className="font-bold">Görünen Reklam Yüksekliği:</span>
            <span className="text-blue-600 font-black">{status.adHeight} px</span>
          </div>
        </div>

        <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-100 text-sm">
          <p className="font-bold text-red-700 mb-2">💡 Analiz Notu:</p>
          <ul className="list-disc list-inside text-red-600 space-y-1">
            {status.adHeight === 0 && <li>Reklam alanı mevcut ama içeriği Google tarafından doldurulmuyor.</li>}
            {!status.scriptLoaded && <li>Google AdSense kodu henüz yüklenmemiş.</li>}
            {status.adHeight > 0 && <li>Reklam şu an başarıyla sunuluyor!</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}