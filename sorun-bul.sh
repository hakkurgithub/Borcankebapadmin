#!/bin/bash
echo "------------------------------------------------"
echo "��� BORCAN KEBAP SİTE TARAMA BAŞLADI..."
echo "------------------------------------------------"

echo "1. Dosya Yapısı Kontrol Ediliyor..."
[ -f "lib/prisma.ts" ] && echo "✅ prisma.ts mevcut" || echo "❌ prisma.ts EKSİK"
[ -f ".env" ] && echo "✅ .env mevcut" || echo "❌ .env EKSİK"

echo -e "\n2. Kritik Hata Taraması (Syntax & Logic)..."
grep -rn "export const dynamic" app/menu/page.tsx | wc -l | xargs -I {} echo "Sayfadaki dynamic tanımı sayısı: {} (1 olmalı)"
grep -rn "}.*{" lib/products.ts && echo "❌ Parantez hatası bulundu!" || echo "✅ Parantez yapısı temiz görünüyor."

echo -e "\n3. Build Testi Yapılıyor (Bu biraz sürebilir)..."
npm run build > build-log.txt 2>&1

if grep -q "Compiled successfully" build-log.txt; then
    echo "⭐⭐⭐ TEBRİKLER: SİTE YAYINA HAZIR! ⭐⭐⭐"
else
    echo "❌ HATA BULUNDU: Build logunun son satırlarını aşağıda görebilirsin:"
    tail -n 15 build-log.txt
fi

echo "------------------------------------------------"
echo "Tarama bitti. Hata varsa yukarıdaki logu bana atın."
