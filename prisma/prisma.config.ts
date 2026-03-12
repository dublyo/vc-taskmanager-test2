import type { PrismaClient } from '@prisma/client'

export const prismaConfig = {
  log: ['query', 'info', 'warn', 'error'],
}