import { ITypeKind } from '@codelab/shared/abstract/core'
import { z } from 'zod'
import { BaseTypeSchema } from './type.interface'

/**
 * Entity
 */
const ReactNodeTypeSchema = BaseTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.ReactNodeType}`).optional(),
})

export type IReactNodeType = z.infer<typeof ReactNodeTypeSchema>

/**
 * Export
 */
const ReactNodeTypeExportSchema = ReactNodeTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.ReactNodeType}`),
})

export type IReactNodeTypeExport = z.infer<typeof ReactNodeTypeExportSchema>

/**
 * Create
 */
const CreateReactNodeTypeSchema = ReactNodeTypeSchema.pick({
  __typename: true,
  owner: true,
})

export type ICreateReactNodeType = z.infer<typeof CreateReactNodeTypeSchema>
