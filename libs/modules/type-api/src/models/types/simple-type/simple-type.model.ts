import { Field, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { PrimitiveType, primitiveTypeSchema } from '../primitive-type'
import { Type } from '../type.model'

/**
 * A wrapper for a PrimitiveType
 */
@ObjectType({
  implements: () => [Type],
})
export class SimpleType implements Type {
  declare id: string

  declare name: string

  @Field(() => PrimitiveType)
  declare primitiveType: PrimitiveType

  constructor(id: string, name: string, primitiveType: PrimitiveType) {
    this.id = id
    this.name = name
    this.primitiveType = primitiveType
  }

  static Schema: z.ZodSchema<SimpleType> = Type.Schema.extend({
    primitiveType: primitiveTypeSchema,
  })
}
