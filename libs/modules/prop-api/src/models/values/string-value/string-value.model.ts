import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

@ObjectType()
export class StringValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField()
  declare value: string

  static Schema = z.object({
    id: z.string(),
    value: z.string(),
  })
}
