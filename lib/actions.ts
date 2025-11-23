'use server'

import { db } from './db';
import { products } from './schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Ürünleri Getir (Manager için)
export async function getManagerProducts() {
  return await db.select().from(products).orderBy(desc(products.id));
}

// Yeni Ürün Ekle
export async function addProduct(data: any) {
  try {
    await db.insert(products).values({
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      category: data.category,
      image: data.image,
      isActive: 1
    });
    revalidatePath('/manager/products'); // Sayfayı yenile
    revalidatePath('/menu');
    return { success: true };
  } catch (error) {
    console.error("Ürün ekleme hatası:", error);
    return { success: false, error: String(error) };
  }
}

// Ürün Güncelle
export async function updateProduct(id: number, data: any) {
  try {
    await db.update(products).set({
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      category: data.category,
      image: data.image,
      isActive: parseInt(data.isActive)
    }).where(eq(products.id, id));
    
    revalidatePath('/manager/products');
    revalidatePath('/menu');
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

// Ürün Sil (Soft Delete - isActive: 0 yapar)
export async function deleteProduct(id: number) {
  try {
    // Veriyi tamamen silmek yerine pasife çekiyoruz
    await db.update(products).set({ isActive: 0 }).where(eq(products.id, id));
    
    revalidatePath('/manager/products');
    revalidatePath('/menu');
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}