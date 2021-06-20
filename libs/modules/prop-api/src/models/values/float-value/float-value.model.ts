import { Field as GraphqlField, Float, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

@ObjectType()
export class FloatValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField(() => Float)
  declare value: number

  static Schema = z.object({
    id: z.string(),
    value: z.number(),
  })
}
