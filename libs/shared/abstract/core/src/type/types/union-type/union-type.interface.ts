import { z } from 'zod'
import { BaseTypeSchema } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

export const UnionTypeSchema = BaseTypeSchema.extend({
  typeKind: z.literal(TypeKind.UnionType).default(TypeKind.UnionType),
  typeIdsOfUnionType: z.string().array(),
})

export type IUnionType = z.infer<typeof UnionTypeSchema>
