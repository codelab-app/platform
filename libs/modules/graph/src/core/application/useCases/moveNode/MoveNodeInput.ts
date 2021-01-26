import { Field, InputType } from '@nestjs/graphql'
import { EdgeType } from '../../../domain/edge/EdgeType'

@InputType()
export class MoveNodeInput {
  @Field()
  declare graphId: string

  @Field(() => EdgeType)
  declare type: EdgeType
}
