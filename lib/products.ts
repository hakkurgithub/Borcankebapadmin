import { db } from './db';
import { products, orders, users } from './schema';
import { eq, desc, sql } from 'drizzle-orm'; // 'sql' eklendi

// 1. Tüm Ürünleri Çek (ÖZEL KATEGORİ SIRALAMASI İLE)
export const getAllProducts = async () => {
  return await db.select().from(products).orderBy(
    // SQL CASE yapısı ile özel sıralama mantığı
    sql`CASE 
      WHEN ${products.category} = 'Kebaplar & Izgaralar' THEN 1
      WHEN ${products.category} = 'Pide & Lahmacun' THEN 2
      WHEN ${products.category} = 'Döner' THEN 3
      WHEN ${products.category} = 'Dürüm' THEN 4
      WHEN ${products.category} = 'Çorbalar' THEN 5
      WHEN ${products.category} = 'Yan Ürünler' THEN 6
      WHEN ${products.category} = 'Tatlılar' THEN 7
      WHEN ${products.category} = 'İçecekler' THEN 8
      ELSE 9 -- Tanımsız kategoriler en sona
    END`
  );
};

// 2. Kategoriye Göre Ürünleri Çek
export const getProductsByCategory = async (category: string) => {
  return await db.select().from(products).where(eq(products.category, category));
};

// 3. Tüm Siparişleri Çek (Yönetici İçin)
export const getAllOrders = async () => {
  return await db
    .select({
      id: orders.id,
      customerName: orders.customerName,
      status: orders.status,
      orderType: orders.orderType,
      total: orders.total,
      createdAt: orders.createdAt,
      userId: orders.userId,
    })
    .from(orders)
    .orderBy(desc(orders.createdAt));
};

// 4. Kullanıcı Emailine Göre Sipariş Çek
export const getUserOrders = async (userEmail: string) => {
    const user = await db.select().from(users).where(eq(users.email, userEmail)).limit(1);
    if (user.length === 0) return [];
    
    return await db.select().from(orders).where(eq(orders.userId, user[0].id)).orderBy(desc(orders.createdAt));
};

// 5. Kullanıcı ID'sine Göre Sipariş Çek
export const getOrdersByUser = async (userId: number) => {
  return await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
};

// 6. Rezervasyon (Boş fonksiyon - hata vermemesi için)
export const getAllReservations = async () => {
    return []; 
};

export const createReservation = async (data: any) => {
    return null;
};