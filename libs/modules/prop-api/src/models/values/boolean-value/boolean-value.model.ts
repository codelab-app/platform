import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

@ObjectType()
export class BooleanValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField()
  declare value: boolean

  static Schema = z.object({
    id: z.string(),
    value: z.boolean(),
  })
}
