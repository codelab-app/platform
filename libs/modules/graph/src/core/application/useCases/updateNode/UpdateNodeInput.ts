import { Field, InputType } from '@nestjs/graphql'
import { UpdateNodeVertexType } from '../inputTypes/UpdateNodeVertexType'

@InputType()
export class UpdateNodeInput {
  @Field()
  declare graphId: string

  @Field(() => UpdateNodeVertexType)
  declare type: UpdateNodeVertexType
}
