import { z } from 'zod'
import { TypeKind } from './type-kind.enum'

export const BaseTypeSchema = z.object({
  id: z.string().default(''),
  name: z.string(),
  typeKind: z.nativeEnum(TypeKind),
})

export type IBaseType = z.infer<typeof BaseTypeSchema>
