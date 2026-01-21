import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        // Vercel'deki farklı isimleri de kontrol eder
        url: process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL,
      },
    },
  })
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
export default prisma