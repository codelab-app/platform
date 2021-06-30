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

  constructor(id: string, minLength: number | null, maxLength: number | null) {
    this.id = id
    this.minLength = minLength
    this.maxLength = maxLength
  }
}

export const arrayLengthValidatorSchema: z.ZodSchema<ArrayLengthValidator> =
  z.object({
    id: z.string(),
    min: z.number().int().nullable(),
    max: z.number().int().nullable(),
  })
