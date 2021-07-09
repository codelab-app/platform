import { Field, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { Type } from '../type.model'
import { PrimitiveKind, primitiveKindSchema } from './primitive-kind.model'

/**
 * A wrapper for a PrimitiveKind
 */
@ObjectType({
  implements: () => [Type],
})
export class PrimitiveType implements Type {
  declare id: string

  declare name: string

  @Field(() => PrimitiveKind)
  declare primitiveKind: PrimitiveKind

  constructor(id: string, name: string, primitiveKind: PrimitiveKind) {
    this.id = id
    this.name = name
    this.primitiveKind = primitiveKind
  }

  static Schema: z.ZodSchema<PrimitiveType> = Type.Schema.extend({
    primitiveKind: primitiveKindSchema,
  })
}
