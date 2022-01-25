import { z } from 'zod'
import { BaseTypeSchema } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'
import { PrimitiveTypeKind } from './primitive-type.enum'

export const PrimitiveTypeSchema = BaseTypeSchema.extend({
  typeKind: z.literal(TypeKind.PrimitiveType).default(TypeKind.PrimitiveType),
  primitiveKind: z.nativeEnum(PrimitiveTypeKind),
})

/**
 * Base atomic building block of the type system.
 * Represents primitive types - String, Integer, Float, Boolean
 *
 * @property {PrimitiveTypeKind} primitiveKind - concrete primitive kind
 */
export type IPrimitiveType = z.infer<typeof PrimitiveTypeSchema>
