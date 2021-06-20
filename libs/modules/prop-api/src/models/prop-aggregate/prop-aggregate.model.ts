import { Field as GraphqlField, ObjectType } from '@nestjs/graphql'
import { Prop } from '../prop'
import { PropValue } from '../values/prop-value'

@ObjectType({
  description: 'The aggregate prop and value descendants of a single root prop',
})
export class PropAggregate {
  @GraphqlField(() => Prop)
  declare rootProp: Prop

  @GraphqlField(() => [Prop], {
    description:
      'All props that are descendant of this Prop, normalized to an array',
  })
  declare props: Array<Prop>

  @GraphqlField(() => [PropValue], {
    description:
      'All values that are descendant of this Prop, normalized to an array',
  })
  declare values: Array<typeof PropValue>
}
