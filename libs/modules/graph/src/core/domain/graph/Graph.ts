import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { GraphType as PrismaGraphType } from '@prisma/client'
import { Edge } from '../edge/Edge'
import { Vertex } from '../vertex/Vertex'
import { GraphType } from './GraphType'

registerEnumType(GraphType, {
  name: 'GraphType',
})

@ObjectType('Graph')
export class Graph {
  @Field()
  declare id: string

  @Field(() => GraphType)
  declare type: PrismaGraphType

  @Field()
  declare label: string

  @Field(() => [Vertex], { defaultValue: [] })
  declare vertices: Array<Vertex>

  @Field(() => [Edge], { defaultValue: [] })
  declare edges: Array<Edge>
}
