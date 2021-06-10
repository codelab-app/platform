import { Field, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

/**
 * Represents an array type. The type field clarifies the type of items in the array
 */
@ObjectType()
export class ArrayType {
  @Field(() => ID)
  declare id: string

  @Field()
  declare typeId: string
}

export const arrayTypeSchema: z.ZodSchema<ArrayType> = z.object({
  id: z.string(),
  typeId: z.string(),
})
