'use client';

import { useState, useEffect } from "react";
import { useCart } from "../../components/CartProvider"; // Eğer hata verirse yolunu '../components/CartProvider' olarak dene
import Image from "next/image";

interface Product {
    id: number;
    name: string;
    description: string | null;
    price: number | string;
    priceInLira?: number;
    formattedPrice?: string;
    category: string | null;
    image: string | null;
    isActive: number;
}

export default function MenuPage() {
    const { addItem, items } = useCart();
    const [activeCategory, setActiveCategory] = useState("all");
    const [isClient, setIsClient] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setIsClient(true);
        
        // ÖNEMLİ DÜZELTME: { cache: 'no-store' } eklendi.
        // Bu sayede Next.js eski boş veriyi değil, veritabanındaki yeni veriyi zorla çeker.
        fetch('/api/products', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                console.log("Veritabanından Gelen Veri:", data); // Konsoldan kontrol edebilirsin
                if (data.success) {
                    setProducts(data.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading products:', error);
                setLoading(false);
            });
    }, []);

    const categories = [
        "all",
        "Kebaplar & Izgaralar",
        "Pide & Lahmacun",
        "Döner",
        "Dürüm",
        "Çorbalar",
        "Yan Ürünler",
        "Tatlılar",
        "İçecekler"
    ];

    const filteredItems = products.filter((item) =>
        activeCategory === "all" ? true : item.category === activeCategory
    );

    const handleAddToCart = (item: Product) => {
        const price = item.priceInLira || parseFloat(String(item.price));
        addItem({
            id: String(item.id),
            name: item.name,
            price: price,
        });
    };

    // Sayfa yüklenirken veya Client tarafı hazır değilken gösterilecek ekran
    if (!isClient || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600 font-semibold">Menü Yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 py-12">
                <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
                    Lezzet Menümüz
                </h1>

                {/* Kategori Filtresi */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                activeCategory === category
                                    ? "bg-red-600 text-white shadow-md transform scale-105"
                                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                            }`}
                        >
                            {category === "all" ? "Tümü" : category}
                        </button>
                    ))}
                </div>

                {/* Ürün Yoksa Gösterilecek Uyarı */}
                {!loading && filteredItems.length === 0 && (
                    <div className="text-center py-10 bg-white rounded-xl shadow p-8 max-w-lg mx-auto">
                        <div className="text-5xl mb-4">🍽️</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Ürün Bulunamadı</h3>
                        <p className="text-gray-500 mb-4">
                            "{activeCategory === 'all' ? 'Tümü' : activeCategory}" kategorisinde henüz ürün eklenmemiş olabilir.
                        </p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-semibold"
                        >
                            Sayfayı Yenile
                        </button>
                    </div>
                )}

                {/* Menü Kartları */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item) => {
                        const cartItem = items.find(cartItem => cartItem.id === String(item.id));
                        
                        return (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 border border-gray-100 group"
                            >
                                {/* Resim Alanı */}
                                <div className="relative w-full h-56 sm:h-64 bg-gray-200 overflow-hidden">
                                    <Image
                                        src={item.image || '/images/placeholder.jpg'}
                                        alt={item.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        priority={item.id < 6}
                                    />
                                </div>
                                
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                                        {item.category && (
                                            <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full font-medium">
                                                {item.category}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm flex-1 line-clamp-2 mb-4">
                                        {item.description || "Lezzetli bir seçim."}
                                    </p>
                                    
                                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                                        <span className="text-2xl font-bold text-red-600">
                                            {item.formattedPrice ? item.formattedPrice : `${item.price} ₺`}
                                        </span>
                                        <div className="relative">
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 active:bg-red-800 transition-colors shadow-sm"
                                            >
                                                <span>Sepete Ekle</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                                </svg>
                                            </button>
                                            {cartItem && (
                                                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-sm border-2 border-white animate-bounce">
                                                    {cartItem.quantity}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}