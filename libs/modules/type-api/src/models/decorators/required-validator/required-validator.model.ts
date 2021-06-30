import { Field, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

@ObjectType()
export class RequiredValidator {
  @Field(() => ID)
  declare id: string

  @Field(() => Boolean)
  declare isRequired: boolean

  constructor(id: string, isRequired: boolean) {
    this.id = id
    this.isRequired = isRequired
  }
}

export const requiredValidatorSchema: z.ZodSchema<RequiredValidator> = z.object(
  {
    id: z.string(),
    isRequired: z.boolean(),
  },
)
