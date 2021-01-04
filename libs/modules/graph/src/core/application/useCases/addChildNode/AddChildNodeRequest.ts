import { Field, InputType } from '@nestjs/graphql'
import { VertexID } from '../../../../common/CommonTypes'
import { AddChildNodeVertexType } from '../inputTypes/AddChildNodeVertexType'

@InputType()
export class AddChildNodeRequest {
  @Field()
  declare graphId: string

  @Field((returns) => String, { nullable: true })
  declare parentVertexId: VertexID

  @Field((returns) => AddChildNodeVertexType)
  declare vertex: AddChildNodeVertexType

  @Field({ nullable: true })
  declare order?: number
}
