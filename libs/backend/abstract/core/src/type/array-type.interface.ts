import { ITypeKind } from '@codelab/shared/abstract/core'
import { z } from 'zod'
import { BaseTypeSchema } from './type.interface'

/**
 * Entity
 */
const ArrayTypeSchema = BaseTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.ArrayType}`).optional(),
})

export type IArrayType = z.infer<typeof ArrayTypeSchema>

/**
 * Export
 */
const ArrayTypeExportSchema = ArrayTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.ArrayType}`),
})

export type IArrayTypeExport = z.infer<typeof ArrayTypeExportSchema>

/**
 * Create
 */
const CreateArrayTypeSchema = ArrayTypeSchema.omit({
  kind: true,
})

export type ICreateArrayType = z.infer<typeof CreateArrayTypeSchema>
