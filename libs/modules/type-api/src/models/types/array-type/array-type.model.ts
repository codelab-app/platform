import { Field, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { Type } from '../type.model'

/**
 * Represents an array type. The type field clarifies the type of items in the array
 */
@ObjectType({
  implements: () => [Type],
})
export class ArrayType implements Type {
  declare id: string

  declare name: string

  @Field()
  declare typeId: string

  constructor(id: string, name: string, typeId: string) {
    this.id = id
    this.name = name
    this.typeId = typeId
  }

  static Schema: z.ZodSchema<ArrayType> = Type.Schema.extend({
    typeId: z.string(),
  })
}
