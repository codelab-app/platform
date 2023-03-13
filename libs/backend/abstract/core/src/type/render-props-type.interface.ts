import { ITypeKind } from '@codelab/shared/abstract/core'
import { z } from 'zod'
import { BaseTypeSchema } from './type.interface'

/**
 * Entity
 */
const RenderPropsTypeSchema = BaseTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.RenderPropsType}`).optional(),
})

export type IRenderPropsType = z.infer<typeof RenderPropsTypeSchema>

/**
 * Export
 */
const RenderPropsTypeExportSchema = RenderPropsTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.RenderPropsType}`),
})

export type IRenderPropsTypeExport = z.infer<typeof RenderPropsTypeExportSchema>

/**
 * Create
 */
const CreateRenderPropsTypeSchema = RenderPropsTypeSchema.omit({
  kind: true,
  name: true,
})

export type ICreateRenderPropsType = z.infer<typeof CreateRenderPropsTypeSchema>
