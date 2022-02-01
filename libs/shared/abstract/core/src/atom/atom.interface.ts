import { z } from 'zod'
import { AtomType } from './atom-type.enum'

export const AtomSchema = z.object({
  id: z.string().default(''),
  type: z.nativeEnum(AtomType),
  name: z.string(),
  api: z.object({ id: z.string() }),
})

export type IAtom = z.infer<typeof AtomSchema>
