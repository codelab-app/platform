import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { PropValue, propValueSchema } from '../prop-value'

@ObjectType()
export class ArrayValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField(() => [PropValue])
  // Optional, because a field resolver can get it
  declare values?: Array<PropValue>

  constructor(id: string) {
    this.id = id
  }

  static Schema: z.ZodSchema<ArrayValue> = z.lazy(() =>
    z.object({
      id: z.string(),
      values: propValueSchema.array(),
    }),
  )
}
