"use server";

import { prisma } from "@/lib/prisma";

/* ===============================
   TYPES (Frontend'e gidecek tip)
================================ */
export type ProductDTO = {
  id: number;
  name: string;
  description: string | null;
  category: string;
  image: string | null;
  price: number;
  isPopular: boolean;
};

/* ===============================
   GET – Manager ürünleri
================================ */
export async function getManagerProducts(): Promise<ProductDTO[]> {
  const products = await prisma.products.findMany({
    orderBy: { created_at: "desc" },
  });

  // 🔥 DB → Frontend mapping
  return products.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    category: p.category ?? "",
    image: p.image,
    price: Number(p.price),
    isPopular: p.is_active === 1,
  }));
}

/* ===============================
   ADD
================================ */
export async function addProduct(data: {
  name: string;
  description?: string | null;
  category?: string | null;
  image?: string | null;
  price: number;
}) {
  await prisma.products.create({
    data: {
      name: data.name,
      description: data.description ?? null,
      category: data.category ?? null,
      image: data.image ?? null,
      price: data.price,
      is_active: 1,
    },
  });
}

/* ===============================
   UPDATE
================================ */
export async function updateProduct(
  id: number,
  data: {
    name: string;
    description?: string | null;
    category?: string | null;
    image?: string | null;
    price: number;
  }
) {
  await prisma.products.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description ?? null,
      category: data.category ?? null,
      image: data.image ?? null,
      price: data.price,
    },
  });
}

/* ===============================
   DELETE
================================ */
export async function deleteProduct(id: number) {
  await prisma.products.delete({
    where: { id },
  });
}

/* ===============================
   TOGGLE (is_active ↔ isPopular)
================================ */
export async function toggleProductStatus(
  id: number,
  isPopular: boolean
) {
  await prisma.products.update({
    where: { id },
    data: {
      is_active: isPopular ? 1 : 0,
    },
  });
}
