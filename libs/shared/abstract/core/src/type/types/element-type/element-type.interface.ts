import { z } from 'zod'
import { BaseTypeSchema } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'
import { ElementTypeKind } from './element-type.enum'

export const ElementTypeSchema = BaseTypeSchema.extend({
  typeKind: z.literal(TypeKind.ElementType).default(TypeKind.ElementType),
  elementKind: z.nativeEnum(ElementTypeKind),
})

export type IElementType = z.infer<typeof ElementTypeSchema>
