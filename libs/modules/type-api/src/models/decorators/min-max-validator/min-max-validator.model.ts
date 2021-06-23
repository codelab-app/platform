import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

/**
 * Used to validate the value of Integer and Float types and length of strings
 */
@ObjectType()
export class MinMaxValidator {
  @Field(() => ID)
  declare id: string

  @Field(() => Int, { nullable: true })
  declare min?: number | null

  @Field(() => Int, { nullable: true })
  declare max?: number | null

  constructor(id: string, min: number | null, max: number | null) {
    this.id = id
    this.min = min
    this.max = max
  }
}

export const minMaxValidatorSchema: z.ZodSchema<MinMaxValidator> = z.object({
  id: z.string(),
  min: z.number().int().nullable(),
  max: z.number().int().nullable(),
})
