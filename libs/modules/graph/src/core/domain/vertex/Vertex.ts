import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { VertexType } from './VertexType'

@ObjectType('Vertex')
export class Vertex {
  @Field({ nullable: true })
  declare id: string

  @Field(() => VertexType)
  declare type: VertexType

  @Field(() => GraphQLJSONObject)
  declare props?: object

  declare parent?: string
}
