import { Field, InputType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { NodeType } from '@codelab/backend'

@InputType()
export class UpdateNodeVertexType {
  @Field()
  declare id: string

  @Field((returns) => NodeType)
  declare type: NodeType

  @Field((returns) => GraphQLJSONObject)
  declare props: any
}
