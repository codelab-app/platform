import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { VertexType } from '../core/domain/vertex/vertex-type.codec'

@ObjectType('Vertex')
export class VertexDto {
  @Field({ nullable: true })
  declare id?: string

  @Field(() => VertexType)
  declare type: VertexType

  @Field(() => GraphQLJSONObject)
  declare props?: object

  declare parent?: string
}
