import { z } from 'zod'
import { BaseTypeSchema } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

export const EnumTypeValue = z.object({
  id: z.string().default(''),
  name: z.string().optional().nullable(),
  value: z.string(),
})

export type IEnumTypeValue = z.infer<typeof EnumTypeValue>

export const EnumTypeSchema = BaseTypeSchema.extend({
  typeKind: z.literal(TypeKind.EnumType).default(TypeKind.EnumType),
  allowedValues: z.array(EnumTypeValue).nullish(),
})

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 *
 * @property {IEnumTypeValue[]} allowedValues - The list of allowed values.
 */
export type IEnumType = z.infer<typeof EnumTypeSchema>
