import { z } from 'zod'
import { FieldSchema } from '../../graph/type-edge.interface'
import { BaseTypeSchema } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

export const InterfaceTypeSchema = BaseTypeSchema.extend({
  typeKind: z.literal(TypeKind.InterfaceType).default(TypeKind.InterfaceType),
  fields: FieldSchema.array().default([]),
})

/**
 * Represent an object type with multiple fields
 *
 * @property fields {@link IField[]} - Fields of the object type
 */
export type IInterfaceType = z.infer<typeof InterfaceTypeSchema>
