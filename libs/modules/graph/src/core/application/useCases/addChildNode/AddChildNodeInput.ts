import { Field, InputType } from '@nestjs/graphql'
import { AddChildNodeVertexType } from '../inputTypes/AddChildNodeVertexType'

@InputType()
export class AddChildNodeInput {
  @Field()
  declare graphId: string

  @Field(() => String, { nullable: true })
  declare parentVertexId: string

  @Field(() => AddChildNodeVertexType)
  declare vertex: AddChildNodeVertexType

  @Field({ nullable: true })
  declare order?: number
}
