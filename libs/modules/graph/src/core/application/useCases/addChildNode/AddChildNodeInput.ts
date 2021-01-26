import { Field, InputType } from '@nestjs/graphql'
import { AddChildNodeVertexInput } from '../../../../presentation/AddChildNodeVertexInput'
import { VertexType } from '../../../domain/vertex/vertex-type.codec'

@InputType()
export class AddChildNodeInput {
  @Field()
  declare graphId: string

  @Field(() => VertexType)
  declare type: VertexType

  @Field(() => String, { nullable: true })
  declare parentVertexId: string

  @Field(() => AddChildNodeVertexInput)
  declare vertex: AddChildNodeVertexInput

  @Field({ nullable: true })
  declare order?: number
}
