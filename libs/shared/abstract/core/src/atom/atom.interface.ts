import { z } from 'zod'
import { BaseTypeSchema } from '../type'
import { AtomType } from './atom-type.enum'

export const AtomSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(AtomType),
  name: z.string(),
  api: BaseTypeSchema,
})

export type IAtom = z.infer<typeof AtomSchema>
