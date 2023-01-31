import { ITypeKind } from '@codelab/shared/abstract/core'
import { z } from 'zod'
import { BaseTypeSchema } from './type.interface'

const EnumTypeValueSchema = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
})

export type IEnumTypeValue = z.infer<typeof EnumTypeValueSchema>

const EnumTypeExport = BaseTypeSchema.extend({
  __typename: z.literal(ITypeKind.EnumType),
  allowedValues: z.array(EnumTypeValueSchema),
})

export type IEnumTypeExport = z.infer<typeof EnumTypeExport>

const EnumTypeSchema = BaseTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.EnumType}`).optional(),
  // kind: z.literal(ITypeKind.EnumType),
  allowedValues: z.array(EnumTypeValueSchema),
})

export type IEnumType = z.infer<typeof EnumTypeSchema>
