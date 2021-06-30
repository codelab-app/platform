import { Field, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { Type } from '../type.model'
import { EnumTypeValue } from './enum-type-value.model'

/**
 * Allows only a set of values
 */
@ObjectType({
  implements: () => [Type],
})
export class EnumType implements Type {
  declare id: string

  declare name: string

  @Field(() => [EnumTypeValue])
  declare allowedValues: Array<EnumTypeValue>

  constructor(id: string, name: string, allowedValues: Array<EnumTypeValue>) {
    this.id = id
    this.name = name
    this.allowedValues = allowedValues
  }

  static Schema: z.ZodSchema<EnumType> = Type.Schema.extend({
    allowedValues: EnumTypeValue.Schema.array(),
  })
}
