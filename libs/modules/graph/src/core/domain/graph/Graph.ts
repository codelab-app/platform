import { Field, ObjectType } from '@nestjs/graphql'
import { Edge } from '../edge/Edge'
import { Vertex } from '../vertex/Vertex'

@ObjectType('Graph')
export class Graph {
  @Field({ nullable: true })
  declare id: string

  @Field()
  public declare label: string

  @Field(() => [Vertex], { defaultValue: [] })
  declare vertices?: Array<Vertex>

  @Field(() => [Edge], { defaultValue: [] })
  declare edges?: Array<Edge>
}
