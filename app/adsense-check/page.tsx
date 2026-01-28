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
      
      // HATA BURADAYDI: (window as any) ekleyerek çözüyoruz
      const adsObj = (window as any).adsbygoogle;

      setStatus({
        scriptLoaded: !!adsScript,
        adBlockerActive: !adsObj,
        insElementFound: !!insElement,
        adsbygoogleObject: !!adsObj,
        adHeight: adRect ? adRect.height : 0
      });
    };
    const timer = setTimeout(checkAdSense, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 pt-32 px-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-[32px] shadow-xl border border-stone-200">
        <h1 className="text-2xl font-black text-stone-900 mb-6 text-center border-b pb-4">Borcan Kebap AdSense Kontrol</h1>
        <div className="space-y-4">
          <div className="flex justify-between p-4 bg-stone-100 rounded-2xl font-bold">
            <span>Script Durumu:</span>
            <span>{status.scriptLoaded ? "Yüklendi ✅" : "Eksik ❌"}</span>
          </div>
          <div className="flex justify-between p-4 bg-stone-100 rounded-2xl font-bold text-blue-600">
            <span>Reklam Yüksekliği:</span>
            <span>{status.adHeight} px</span>
          </div>
        </div>
      </div>
    </div>
  );
}