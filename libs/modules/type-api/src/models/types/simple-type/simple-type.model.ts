import { Field, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { PrimitiveType, primitiveTypeSchema } from '../primitive-type'

/**
 * A wrapper for a PrimitiveType
 */
@ObjectType()
export class SimpleType {
  @Field(() => ID)
  declare id: string

  @Field(() => PrimitiveType)
  declare primitiveType: PrimitiveType
}

export const simpleTypeSchema: z.ZodSchema<SimpleType> = z.object({
  id: z.string(),
  primitiveType: primitiveTypeSchema,
})
