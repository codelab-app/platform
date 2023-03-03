import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { z } from 'zod'
import { BaseTypeSchema } from './type.interface'

/**
 * Entity
 */
const PrimitiveTypeSchema = BaseTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.PrimitiveType}`).optional(),
  primitiveKind: z.nativeEnum(IPrimitiveTypeKind),
})

export type IPrimitiveType = z.infer<typeof PrimitiveTypeSchema>

/**
 * Export
 */
const PrimitiveTypeExportSchema = PrimitiveTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.PrimitiveType}`),
})

export type IPrimitiveTypeExport = z.infer<typeof PrimitiveTypeExportSchema>

/**
 * Create
 */
const CreatePrimitiveTypeSchema = PrimitiveTypeSchema.pick({
  // id: true,
  __typename: true,
  owner: true,
  primitiveKind: true,
})

export type ICreatePrimitiveType = z.infer<typeof CreatePrimitiveTypeSchema>
