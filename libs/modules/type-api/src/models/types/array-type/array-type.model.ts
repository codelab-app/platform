import { Field, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { Type, typeSchema } from '../type.model'

/**
 * Represents an array type. The type field clarifies the type of items in the array
 */
@ObjectType()
export class ArrayType {
  @Field(() => ID)
  declare id: string

  @Field(() => Type)
  declare type: Type
}

export const arrayTypeSchema = z.object({
  id: z.string(),
  type: typeSchema,
})
