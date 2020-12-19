import { Field, InputType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { NodeType } from '@codelab/alpha/shared/interface/node'

@InputType()
export class UpdateVertexRequest {
  @Field()
  declare id: string

  @Field((returns) => NodeType, { nullable: true })
  public declare type?: NodeType

  @Field((returns) => GraphQLJSONObject)
  public declare props: any
}
