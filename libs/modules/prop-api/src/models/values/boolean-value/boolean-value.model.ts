import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

@ObjectType()
export class BooleanValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField()
  declare booleanValue: boolean

  constructor(id: string, booleanValue: boolean) {
    this.id = id
    this.booleanValue = booleanValue
  }

  static Schema = z.object({
    id: z.string(),
    booleanValue: z.boolean(),
  })
}
