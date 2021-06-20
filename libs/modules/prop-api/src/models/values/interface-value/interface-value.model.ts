import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { Prop } from '../../prop'

@ObjectType()
export class InterfaceValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField(() => [Prop])
  declare props: Array<Prop>

  static Schema: z.ZodSchema<InterfaceValue> = z.lazy(() =>
    z.object({
      id: z.string(),
      props: Prop.Schema.array(),
    }),
  )
}
