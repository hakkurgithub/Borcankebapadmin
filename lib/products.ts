import { prisma } from './prisma';

export async function getAllProducts() {
  try { return await (prisma as any).products.findMany({ orderBy: { name: 'asc' } }); } 
  catch (e) { return []; }
}

export async function getProductsByCategory(cat: string) {
  try { return await (prisma as any).products.findMany({ where: { category: cat } }); } 
  catch (e) { return []; }
}

export async function createReservation(d: any) {
  try { return await (prisma as any).reservations.create({ data: { name: d.name, phone: d.phone, date: d.date, time: d.time, guests: Number(d.guests), message: d.message || "" } }); } 
  catch (e) { throw e; }
}

export async function getAllReservations() {
  try { return await (prisma as any).reservations.findMany({ orderBy: { createdAt: "desc" } }); } 
  catch (e) { return []; }
}

export async function getAllOrders() {
  try { return await (prisma as any).orders.findMany({ orderBy: { createdAt: 'desc' } }); } 
  catch (e) { return []; }
}

export async function getUserOrders(id: any) {
  try { return await (prisma as any).orders.findMany({ where: { OR: [{ userEmail: String(id) }, { userId: String(id) }] }, orderBy: { createdAt: 'desc' } }); } 
  catch (e) { return []; }
}
