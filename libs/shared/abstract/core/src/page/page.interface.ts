import { z } from 'zod'
import { ElementGraphSchema } from '../element'

export const PageSchema = z.object({
  id: z.string(),
  name: z.string(),
  elements: z.optional(ElementGraphSchema),
  rootElementId: z.string(),
})

export type IPage = z.infer<typeof PageSchema>
