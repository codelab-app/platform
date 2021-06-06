import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

/**
 * Used to validate the length of an array
 */
@ObjectType()
export class ArrayLengthValidator {
  @Field(() => ID)
  declare id: string

  @Field(() => Int, { nullable: true })
  declare minLength?: number | null

  @Field(() => Int, { nullable: true })
  declare maxLength?: number | null
}

export const arrayLengthValidatorSchema = z.object({
  id: z.string(),
  min: z.number().int().nullable(),
  max: z.number().int().nullable(),
})
