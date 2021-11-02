import { z } from 'zod'

export const EdgeSchema = z.object({
  source: z.string(),
  target: z.string(),
})

export type IEdge = z.infer<typeof EdgeSchema>
