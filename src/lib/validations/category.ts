import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  color: z.string().min(4).max(9).regex(/^#/),
})

export type CategorySchema = z.infer<typeof categorySchema>