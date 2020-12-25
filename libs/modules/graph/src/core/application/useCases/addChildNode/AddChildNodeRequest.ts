import { Field, InputType } from '@nestjs/graphql'
import { VertexID } from '../../../../common/CommonTypes'
import { CreateVertexRequest } from '../createVertex/CreateVertexRequest'

@InputType()
export class AddChildNodeRequest {
  @Field()
  declare graphId: string

  @Field((returns) => String, { nullable: true })
  declare parentVertexId?: VertexID

  @Field((returns) => CreateVertexRequest)
  declare vertex: CreateVertexRequest

  @Field({ nullable: true })
  declare order?: number
}
