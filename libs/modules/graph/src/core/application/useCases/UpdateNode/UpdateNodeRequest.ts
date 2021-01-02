import { Field, InputType } from '@nestjs/graphql'
import { UpdateNodeVertexType } from '../inputTypes/UpdateNodeVertexType'

@InputType()
export class UpdateNodeRequest {
  @Field()
  declare graphId: string

  @Field((returns) => UpdateNodeVertexType)
  declare type: UpdateNodeVertexType
}
