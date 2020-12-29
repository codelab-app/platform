import { Field, InputType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { NodeType } from '@codelab/backend'

@InputType()
export class UpdateVertexRequest {
  @Field((returns) => NodeType)
  declare type: NodeType

  @Field((returns) => GraphQLJSONObject)
  declare props: object
}
