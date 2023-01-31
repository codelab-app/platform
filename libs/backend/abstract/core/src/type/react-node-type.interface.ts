import { ITypeKind } from '@codelab/shared/abstract/core'
import { z } from 'zod'
import { BaseTypeSchema } from './type.interface'

const ReactNodeTypeSchema = BaseTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.ReactNodeType}`).optional(),
  // kind: z.literal(ITypeKind.ReactNodeType),
})

export type IReactNodeType = z.infer<typeof ReactNodeTypeSchema>

const ReactNodeTypeExportSchema = ReactNodeTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.ReactNodeType}`),
})

export type IReactNodeTypeExport = z.infer<typeof ReactNodeTypeExportSchema>
