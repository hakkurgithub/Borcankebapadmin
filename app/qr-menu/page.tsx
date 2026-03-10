"use client";
import React, { useEffect, useState } from "react";

export default function QRMenuPage() {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    // QR Server API'sini kullanarak yüksek çözünürlüklü QR kod linki oluşturuyoruz
    const url = "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=https://www.borcankebap.com/menu&margin=10&format=png";
    setQrUrl(url);
  }, []);

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "borcan-kebap-menu-qr.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 bg-stone-50">
      <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full text-center border-t-4 border-orange-500">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">🥙 Borcan Kebap</h1>
          <p className="text-slate-500">Dijital Menü QR Kodu</p>
        </div>

        <div className="relative inline-block p-6 bg-white rounded-2xl shadow-inner border border-slate-100 mb-6 group transition-transform hover:scale-[1.02]">
          <span className="absolute -top-3 -right-3 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
            YÜKSEK KALİTE
          </span>
          {qrUrl ? (
            <img 
              src={qrUrl} 
              alt="Borcan Kebap QR Kodu" 
              className="w-64 h-64 rounded-lg mx-auto"
            />
          ) : (
            <div className="w-64 h-64 bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-slate-400">
              Yükleniyor...
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <span className="bg-slate-100 text-slate-600 text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2">
            ⚡ Hızlı Tarama
          </span>
          <span className="bg-slate-100 text-slate-600 text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2">
            ✅ Güvenli Link
          </span>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <button
            onClick={downloadQR}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            QR KODU İNDİR
          </button>
          
          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-[11px] font-mono text-slate-500 break-all">
            https://www.borcankebap.com/menu
          </div>
        </div>
      </div>
    </div>
  );
}