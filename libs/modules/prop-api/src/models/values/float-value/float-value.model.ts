import { Field as GraphqlField, Float, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

@ObjectType()
export class FloatValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField(() => Float)
  declare floatValue: number

  constructor(id: string, floatValue: number) {
    this.id = id
    this.floatValue = floatValue
  }

  static Schema = z.object({
    id: z.string(),
    floatValue: z.number(),
  })
}
