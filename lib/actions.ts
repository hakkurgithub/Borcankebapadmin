'use server'

import { db } from './db';
import { products } from './schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Ürünleri Getir
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
      isActive: 1 // Varsayılan aktif
    });
    revalidatePath('/manager/products');
    revalidatePath('/menu');
    return { success: true };
  } catch (error) {
    console.error("Ekleme Hatası:", error);
    return { success: false, error: String(error) };
  }
}

// Ürün Güncelle (Resim, Fiyat, İsim vb.)
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
    console.error("Güncelleme Hatası:", error);
    return { success: false, error: String(error) };
  }
}

// HIZLI DURUM DEĞİŞTİR (Aktif/Pasif Toggle)
export async function toggleProductStatus(id: number, currentStatus: number) {
  try {
    const newStatus = currentStatus === 1 ? 0 : 1; // Tersine çevir
    await db.update(products).set({ isActive: newStatus }).where(eq(products.id, id));
    
    revalidatePath('/manager/products'); // Yönetici listesini yenile
    revalidatePath('/menu'); // Müşteri menüsünü yenile
    return { success: true, newStatus };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

// Ürün Sil (Tamamen Kaldır)
export async function deleteProduct(id: number) {
  try {
    await db.delete(products).where(eq(products.id, id));
    revalidatePath('/manager/products');
    revalidatePath('/menu');
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}