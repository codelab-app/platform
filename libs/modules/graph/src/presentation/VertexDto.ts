import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { NodeType } from '@codelab/backend'

registerEnumType(NodeType, {
  name: 'NodeType',
})
@ObjectType('Vertex')
export class VertexDto {
  // Must be nullable as deleteVertex does not return an id
  @Field({ nullable: true })
  declare id?: string

  @Field(() => NodeType)
  declare type: NodeType

  @Field(() => GraphQLJSONObject)
  declare props?: object

  declare parent?: string
}
