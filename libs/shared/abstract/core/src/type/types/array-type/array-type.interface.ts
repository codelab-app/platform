import { z } from 'zod'
import { BaseTypeSchema } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

export const ArrayTypeSchema = BaseTypeSchema.extend({
  typeKind: z.literal(TypeKind.ArrayType).default(TypeKind.ArrayType),
})

export type IArrayType = z.infer<typeof ArrayTypeSchema>
