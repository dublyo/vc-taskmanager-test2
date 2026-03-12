import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

export const prismaConfig = {
  adapter,
  log: ['query', 'info', 'warn', 'error'],
}