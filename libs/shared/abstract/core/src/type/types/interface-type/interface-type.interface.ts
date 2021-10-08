import { z } from 'zod'
import { BaseTypeSchema } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

export const InterfaceTypeSchema = BaseTypeSchema.extend({
  typeKind: z.literal(TypeKind.InterfaceType).default(TypeKind.InterfaceType),
})

export type IInterfaceType = z.infer<typeof InterfaceTypeSchema>
