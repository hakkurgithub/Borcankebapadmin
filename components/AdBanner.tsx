"use client";
import { useEffect } from "react";

export default function AdBanner({
  dataAdSlot,
  dataAdFormat = "auto",
  dataFullWidthResponsive = true,
}: {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
}) {
  useEffect(() => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  if (process.env.NODE_ENV !== "production") {
    return (
      <div className="w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm font-semibold rounded-lg my-6">
        Google Reklam Alanı (Prodüksiyonda Görünecek)
      </div>
    );
  }

  return (
    <div className="my-6 overflow-hidden text-center min-h-[100px] bg-white rounded-lg shadow-sm">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      ></ins>
    </div>
  );
}