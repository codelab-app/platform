import { Field, ObjectType } from '@nestjs/graphql'
import { Graph } from '../../../../graph/src/core/domain/graph/Graph'

@ObjectType('Page')
export class Page {
  @Field()
  declare id: string

  @Field()
  declare title: string

  @Field(() => [Graph], { defaultValue: [] })
  declare graphs: Array<Graph>
}
