import { pgTable, serial, text, real, timestamp, integer } from 'drizzle-orm/pg-core';

// 1. Kullanıcılar Tablosu (Users)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email').unique(),
  password: text('password'),
  role: text('role').default('user'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 2. Siparişler Tablosu (Orders)
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  // EKSİK OLAN SÜTUN: userId
  userId: integer('user_id').references(() => users.id), 
  customerName: text('customer_name'),
  customerPhone: text('customer_phone'),
  status: text('status').default('pending'),
  orderType: text('order_type').default('Paket'),
  total: real('total').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  // İsteğe bağlı ek alanlar
  userEmail: text('user_email'), // Bazı fonksiyonlarda kullanılmış olabilir, yedek olarak dursun
});

// 3. Ürünler Tablosu (Products)
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: real('price').notNull(),
  // EKSİK OLAN SÜTUN: category
  category: text('category'), 
  image: text('image'),
  isActive: integer('is_active').default(1),
});