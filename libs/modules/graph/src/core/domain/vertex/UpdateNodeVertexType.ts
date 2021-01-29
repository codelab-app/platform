import { Field, InputType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { NodeType } from '@codelab/backend'

@InputType()
export class UpdateVertexVertexType {
  @Field()
  declare id: string

  @Field(() => NodeType)
  declare type: NodeType

  @Field(() => GraphQLJSONObject)
  declare props: any
}
