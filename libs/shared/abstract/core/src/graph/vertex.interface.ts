import { z } from 'zod'

export const VertexSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
})

export type IVertex = z.infer<typeof VertexSchema>

/**
 * Value objects don't have id's
 */
export type IVertexValueObject = Omit<IVertex, 'id'>

export type IVertexInput = Omit<IVertex, 'id'>
