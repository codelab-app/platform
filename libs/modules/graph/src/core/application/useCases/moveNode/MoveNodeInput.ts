import { Field, InputType } from '@nestjs/graphql'
import { EdgeType } from '../../../../presentation/EdgeType'

@InputType()
export class MoveNodeInput {
  @Field()
  declare graphId: string

  @Field(() => EdgeType)
  declare type: EdgeType
}
