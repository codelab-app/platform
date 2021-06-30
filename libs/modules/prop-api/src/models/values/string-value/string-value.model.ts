import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

@ObjectType()
export class StringValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField()
  declare stringValue: string

  constructor(id: string, stringValue: string) {
    this.id = id
    this.stringValue = stringValue
  }

  static Schema = z.object({
    id: z.string(),
    stringValue: z.string(),
  })
}
