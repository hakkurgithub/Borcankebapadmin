import { db } from './db';
import { products, orders, users } from './schema';
import { eq, desc, and } from 'drizzle-orm';

// 1. Tüm Ürünleri Çek
export const getAllProducts = async () => {
  return await db.select().from(products).orderBy(desc(products.id));
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

// 5. Kullanıcı ID'sine Göre Sipariş Çek (EKSİK OLAN BUYDU)
export const getOrdersByUser = async (userId: number) => {
  return await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
};

// 6. Rezervasyon (Hata vermemesi için boş fonksiyon)
export const getAllReservations = async () => {
    return []; 
};

export const createReservation = async (data: any) => {
    return null;
};