import { prisma } from './prisma';

// 1. Tüm Ürünleri Getir (Manager ve API için)
export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return products.map(p => ({ ...p, price: Number(p.price) }));
  } catch (error) {
    console.error("Ürünler çekilirken hata:", error);
    return [];
  }
}

// 2. Kategoriye Göre Ürünleri Getir
export async function getProductsByCategory(category: string) {
  try {
    const products = await prisma.product.findMany({
      where: { category },
    });
    return products.map(p => ({ ...p, price: Number(p.price) }));
  } catch (error) {
    return [];
  }
}

// 3. Rezervasyon Oluştur
export async function createReservation(data: any) {
  try {
    return await prisma.reservation.create({
      data: {
        name: data.name,
        phone: data.phone,
        date: new Date(data.date),
        time: data.time,
        guests: Number(data.guests),
        message: data.message || "",
      }
    });
  } catch (error) {
    throw new Error("Rezervasyon oluşturulamadı.");
  }
}

// 4. Tüm Rezervasyonları Getir
export async function getAllReservations() {
  try {
    return await prisma.reservation.findMany({
      orderBy: { date: 'desc' }
    });
  } catch (error) {
    return [];
  }
}

// 5. Sipariş Fonksiyonları (Hata vermemesi için boş dönen taslaklar)
// Projenizde Order modeli schema.prisma'ya eklendiğinde burayı güncelleyebiliriz.
export async function getUserOrders(userId: string) {
  return [];
}

export async function getAllOrders() {
  return [];
}