import { ITypeKind } from '@codelab/shared/abstract/core'
import { z } from 'zod'
import { BaseTypeSchema } from './type.interface'

const RenderPropsTypeSchema = BaseTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.RenderPropsType}`).optional(),
  // kind: z.literal(ITypeKind.RenderPropsType),
})

export type IRenderPropsType = z.infer<typeof RenderPropsTypeSchema>

const RenderPropsTypeExportSchema = RenderPropsTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.RenderPropsType}`),
})

export type IRenderPropsTypeExport = z.infer<typeof RenderPropsTypeExportSchema>
