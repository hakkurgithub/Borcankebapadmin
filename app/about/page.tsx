import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-sm border border-stone-200 overflow-hidden">
          {/* Header */}
          <div className="bg-red-700 p-12 text-center text-white">
            <h1 className="text-4xl font-black mb-4">Lezzetin Kardeşlik Hikayesi</h1>
            <p className="text-red-100 text-lg">Borcan Kebap: Dört Kardeşin Ortak Tutkusu</p>
          </div>

          {/* İçerik */}
          <div className="p-12 space-y-8 text-stone-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">Biz Kimiz?</h2>
              <p>
                Borcan Kebap, temelinde aile bağları ve mutfak ustalığı olan bir lezzet durağıdır. 
                Dört kardeşin omuz omuza vererek kurduğu bu işletme, geleneksel Türk mutfağının 
                en seçkin kebap ve döner çeşitlerini modern bir hizmet anlayışıyla sunmaktadır.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8 py-6">
              <div className="bg-stone-100 p-6 rounded-3xl border border-stone-200">
                <h3 className="font-bold text-red-700 mb-2">Vizyonumuz</h3>
                <p className="text-sm">Kardeşler arası dayanışmayı mutfaktaki ustalıkla birleştirerek, misafirlerimize her zaman en kaliteli ve taze lezzetleri sunmak.</p>
              </div>
              <div className="bg-stone-100 p-6 rounded-3xl border border-stone-200">
                <h3 className="font-bold text-red-700 mb-2">Misyonumuz</h3>
                <p className="text-sm">Geleneksel tariflerimize sadık kalarak, hijyen ve kalite standartlarından ödün vermeden kebap kültürünü gelecek nesillere taşımak.</p>
              </div>
            </div>

            <section className="border-t border-stone-100 pt-8">
              <h2 className="text-2xl font-bold text-stone-900 mb-4">Neden Borcan Kebap?</h2>
              <p>
                Bizim için her tabak, ailemizin birer ferdi olarak gördüğümüz misafirlerimize sunduğumuz bir ikramdır. 
                Etlerimizin seçiminden baharatlarımızın dengesine kadar her aşama, dört kardeşin titiz denetiminden geçer. 
                Sadece bir yemek değil, bir güven ve samimiyet hikayesi sunuyoruz.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
