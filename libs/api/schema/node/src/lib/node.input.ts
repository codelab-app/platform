import { Field, InputType } from '@nestjs/graphql'
import { NodeType } from './node.model'

@InputType()
export class NodeCreateInput {
  @Field(() => NodeType)
  declare type: NodeType
}
