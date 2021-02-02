import { Field, ObjectType } from '@nestjs/graphql'
import { GraphType } from '@prisma/client'
import { GraphQLJSONObject } from 'graphql-type-json'
import { Edge } from '../edge/Edge'
import { Vertex } from '../vertex/Vertex'

@ObjectType('Graph')
export class Graph {
  @Field()
  declare id: string

  @Field(() => String, { nullable: true })
  declare type?: GraphType

  @Field(() => GraphQLJSONObject, { nullable: true, defaultValue: {} })
  declare props: object

  @Field()
  declare label: string

  @Field(() => [Vertex], { defaultValue: [] })
  declare vertices: Array<Vertex>

  @Field(() => [Edge], { defaultValue: [] })
  declare edges: Array<Edge>
}
