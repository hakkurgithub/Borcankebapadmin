import { prisma } from './prisma';

export async function getAllProducts() {
  try {
    // @ts-ignore
    return await prisma.products.findMany({ orderBy: { name: 'asc' } });
  } catch (error) {
    console.error("Ürün hatası:", error);
    return [];
  }
}

export async function createReservation(data: any) {
  try {
    // @ts-ignore
    return await prisma.reservations.create({
      data: {
        name: data.name,
        phone: data.phone,
        date: data.date,
        time: data.time,
        guests: Number(data.guests),
        message: data.message || "",
      },
    });
  } catch (error) {
    console.error("Rezervasyon hatası:", error);
    throw error;
  }
}

export async function getAllReservations() {
  try {
    // @ts-ignore
    return await prisma.reservations.findMany({ orderBy: { createdAt: "desc" } });
  } catch (error) {
    console.error("Liste hatası:", error);
    return [];
  }
}

export async function getUserOrders(userEmailOrId: any) {
  try {
    // @ts-ignore
    return await prisma.orders.findMany({
      where: {
        OR: [{ userEmail: String(userEmailOrId) }, { userId: String(userEmailOrId) }]
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Sipariş hatası:", error);
    return [];
  }
}
