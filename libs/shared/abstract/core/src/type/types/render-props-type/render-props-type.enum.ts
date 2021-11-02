import { z } from 'zod'
import { BaseTypeSchema } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

export const RenderPropsTypeSchema = BaseTypeSchema.extend({
  typeKind: z
    .literal(TypeKind.RenderPropsType)
    .default(TypeKind.RenderPropsType),
})

export type IRenderPropsType = z.infer<typeof RenderPropsTypeSchema>
