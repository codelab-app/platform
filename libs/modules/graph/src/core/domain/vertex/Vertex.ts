import { Field, ObjectType } from '@nestjs/graphql'
import { VertexType } from '@prisma/client'
import { GraphQLJSONObject } from 'graphql-type-json'
import { Graph } from '../graph/Graph'

@ObjectType('Vertex')
export class Vertex {
  @Field()
  declare id: string

  @Field(() => String, { nullable: true })
  declare type?: VertexType

  @Field(() => Graph, { nullable: true })
  declare graph?: Graph

  @Field(() => GraphQLJSONObject, { defaultValue: {}, nullable: true })
  declare props?: object

  @Field(() => Vertex, { nullable: true })
  declare parent?: string
}
