import { Field, InputType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { NodeType } from '@codelab/alpha/shared/interface/node'

@InputType()
export class CreateVertexRequest {
  @Field()
  declare graph_id: string

  @Field((returns) => NodeType)
  declare type: NodeType

  @Field((returns) => GraphQLJSONObject)
  declare props: any
}
