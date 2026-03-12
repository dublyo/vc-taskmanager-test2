import { z } from 'zod'

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  dueDate: z.string().optional(),
  categoryId: z.string().optional(),
})

export type TaskSchema = z.infer<typeof taskSchema>