import { Field as GraphqlField, ID, Int, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

@ObjectType()
export class IntValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField(() => Int)
  declare intValue: number

  constructor(id: string, intValue: number) {
    this.id = id
    this.intValue = intValue
  }

  static Schema = z.object({
    id: z.string(),
    intValue: z.number().int(),
  })
}
