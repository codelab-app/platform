import { z } from 'zod'
import { BaseTypeSchema } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

export const ComponentTypeSchema = BaseTypeSchema.extend({
  typeKind: z.literal(TypeKind.ComponentType).default(TypeKind.ComponentType),
})

export type IComponentType = z.infer<typeof ComponentTypeSchema>
