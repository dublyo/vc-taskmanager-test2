import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Prisma client singleton — prevents multiple instances in development.
 * Uses the PostgreSQL driver adapter required by Prisma 7.
 * Logs queries in development for debugging.
 */
function createPrismaClient(): PrismaClient {
  const connectionString =
    process.env.DATABASE_URL ?? 'postgresql://vibecoder:vibecoder@localhost:5432/app'
  const adapter = new PrismaPg({ connectionString })

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === 'development'
        ? ['warn', 'error']
        : ['error'],
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
