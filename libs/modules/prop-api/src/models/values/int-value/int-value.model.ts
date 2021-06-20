import { Field as GraphqlField, ID, Int, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

@ObjectType()
export class IntValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField(() => Int)
  declare value: number

  static Schema = z.object({
    id: z.string(),
    value: z.number().int(),
  })
}
