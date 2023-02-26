import { z } from 'zod'

export const EntitySchema = z.object({
  id: z.string(),
})

export const NullableEntitySchema = z.object({
  id: z.string().nullable(),
})

export type IEntity = z.infer<typeof EntitySchema>

export type INullableEntity = z.infer<typeof NullableEntitySchema>
