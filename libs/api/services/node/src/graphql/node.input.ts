import { Field, ID, InputType } from '@nestjs/graphql'
import { NodeType } from './node.model'

@InputType()
export class NodeCreateInput {
  @Field((returns) => ID, { nullable: false })
  declare id: string

  @Field(() => NodeType)
  declare type: NodeType
}
