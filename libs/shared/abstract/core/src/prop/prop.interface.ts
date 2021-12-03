import { z } from 'zod'

export const PropSchema = z.object({
  id: z.string(),
  data: z.string(),
})

export type IProp = z.infer<typeof PropSchema>
