import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { PropValue, propValueSchema } from '../prop-value'

@ObjectType()
export class ArrayValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField(() => [PropValue])
  declare values: Array<PropValue>

  static Schema: z.ZodSchema<ArrayValue> = z.lazy(() =>
    z.object({
      id: z.string(),
      values: propValueSchema.array(),
    }),
  )
}
