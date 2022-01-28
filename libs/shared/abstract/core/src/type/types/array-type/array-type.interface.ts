import { z } from 'zod'
import { BaseTypeSchema } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

export const ArrayTypeSchema = BaseTypeSchema.extend({
  typeKind: z.literal(TypeKind.ArrayType).default(TypeKind.ArrayType),
  itemType: z.object({ id: z.string() }),
})

/**
 * Allows defining a variable number of items of a given type.
 *
 * @property itemType - reference to the type of items in the array
 */
export type IArrayType = z.infer<typeof ArrayTypeSchema>
