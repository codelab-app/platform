import { z } from 'zod'

export const EntitySchema = z.object({
  id: z.string(),
})

export type IEntity = z.infer<typeof EntitySchema>
