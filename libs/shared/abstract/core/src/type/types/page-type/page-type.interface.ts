import { z } from 'zod'
import { BaseTypeSchema } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

export const PageTypeSchema = BaseTypeSchema.extend({
  typeKind: z.literal(TypeKind.PageType).default(TypeKind.PageType),
})

export type IPageType = z.infer<typeof PageTypeSchema>
