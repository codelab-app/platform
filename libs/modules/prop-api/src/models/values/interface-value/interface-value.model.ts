import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { Prop } from '../../prop'

@ObjectType()
export class InterfaceValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField(() => [Prop])
  // Optional, because a field resolver can get it
  declare props?: Array<Prop>

  constructor(id: string, props?: Array<Prop>) {
    this.id = id
    this.props = props
  }

  static Schema: z.ZodSchema<InterfaceValue> = z.lazy(() =>
    z.object({
      id: z.string(),
      props: Prop.Schema.array(),
    }),
  )
}
