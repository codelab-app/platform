import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { Graph } from '../graph/Graph'
import { NodeType } from '@codelab/backend'

registerEnumType(NodeType, {
  name: 'NodeType',
})

@ObjectType('Vertex')
export class Vertex {
  @Field()
  declare id: string

  @Field(() => NodeType)
  declare type?: NodeType

  @Field(() => Graph)
  declare graph: Graph

  @Field(() => GraphQLJSONObject, { nullable: true })
  declare props?: object

  @Field(() => Vertex, { nullable: true })
  declare parent?: string
}
