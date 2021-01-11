import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { NodeType } from '@codelab/backend'

registerEnumType(NodeType, {
  name: 'NodeType',
})
@ObjectType()
export class VertexDto {
  // Must be nullable as deleteVertex does not return an id
  @Field({ nullable: true })
  public declare id?: string

  @Field((returns) => NodeType)
  public declare type: NodeType

  @Field((returns) => GraphQLJSONObject)
  public declare props: any
}
