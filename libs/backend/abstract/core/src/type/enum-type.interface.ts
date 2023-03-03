import { ITypeKind } from '@codelab/shared/abstract/core'
import { z } from 'zod'
import { BaseTypeSchema } from './type.interface'

/**
 * Entity
 */
const EnumTypeValueSchema = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
})

export type IEnumTypeValue = z.infer<typeof EnumTypeValueSchema>

const EnumTypeSchema = BaseTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.EnumType}`).optional(),
  // kind: z.literal(ITypeKind.EnumType),
  allowedValues: z.array(EnumTypeValueSchema),
})

export type IEnumType = z.infer<typeof EnumTypeSchema>

/**
 * Export
 */
const EnumTypeExportSchema = EnumTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.EnumType}`),
})

export type IEnumTypeExport = z.infer<typeof EnumTypeExportSchema>

/**
 * Create
 */
const CreateEnumTypeSchema = EnumTypeSchema.pick({
  __typename: true,

  allowedValues: true,
  // id: true,
  name: true,
  owner: true,
})

export type ICreateEnumType = z.infer<typeof CreateEnumTypeSchema>
