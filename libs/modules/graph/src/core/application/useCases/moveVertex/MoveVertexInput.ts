import { Field, InputType } from '@nestjs/graphql'
import { EdgeType } from '../../../domain/edge/EdgeType'

@InputType()
export class MoveVertexInput {
  @Field()
  declare graphId: string

  @Field(() => EdgeType)
  declare type: EdgeType
}
