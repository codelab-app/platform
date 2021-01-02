import { Field, InputType } from '@nestjs/graphql'
import { EdgeType } from '../inputTypes/EdgeType'

@InputType()
export class MoveNodeRequest {
  @Field()
  declare graphId: string

  @Field((returns) => EdgeType)
  declare type: EdgeType
}
