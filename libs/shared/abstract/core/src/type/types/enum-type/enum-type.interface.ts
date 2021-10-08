import { z } from 'zod'
import { BaseTypeSchema } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

export const EnumTypeValue = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  value: z.string(),
})

export type IEnumTypeValue = z.infer<typeof EnumTypeValue>

export const EnumTypeSchema = BaseTypeSchema.extend({
  typeKind: z.literal(TypeKind.EnumType).default(TypeKind.EnumType),
  allowedValues: z.array(EnumTypeValue).default([]),
})

export type IEnumType = z.infer<typeof EnumTypeSchema>
