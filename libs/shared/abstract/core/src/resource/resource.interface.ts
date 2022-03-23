import { z } from 'zod'
import { AtomType } from '../atom'

export const ResourceSchema = z.object({
  id: z.string().default(''),
  name: z.string(),
  type: z.nativeEnum(AtomType),
})

export type IResource = z.infer<typeof ResourceSchema>
