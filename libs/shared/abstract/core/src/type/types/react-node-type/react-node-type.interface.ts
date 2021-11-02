import { z } from 'zod'
import { BaseTypeSchema } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

export const ReactNodeTypeSchema = BaseTypeSchema.extend({
  typeKind: z.literal(TypeKind.ReactNodeType).default(TypeKind.ReactNodeType),
})

export type IReactNodeType = z.infer<typeof ReactNodeTypeSchema>
