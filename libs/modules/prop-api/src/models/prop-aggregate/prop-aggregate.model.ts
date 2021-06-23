import { Field as GraphqlField, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { Prop } from '../prop'
import { PropValue, propValueSchema } from '../values'

@ObjectType({
  description: 'The aggregate prop and value descendants of a single root prop',
})
export class PropAggregate {
  @GraphqlField(() => Prop)
  declare rootProp: Prop

  @GraphqlField(() => [Prop], {
    description:
      'All props that are descendant of this Prop, normalized to an array, including the root prop',
  })
  declare props: Array<Prop>

  @GraphqlField(() => [PropValue], {
    description:
      "All values that are descendant of this Prop, normalized to an array, including the root prop's value",
  })
  declare values: Array<typeof PropValue>

  static Schema = z.object({
    rootProp: Prop.Schema,
    props: Prop.Schema.array(),
    values: propValueSchema.array(),
  })
}
