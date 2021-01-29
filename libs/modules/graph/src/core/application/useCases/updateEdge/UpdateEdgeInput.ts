import { Field, InputType } from '@nestjs/graphql'
import { EdgeType } from '../../../domain/edge/EdgeType'

@InputType()
export class UpdateEdgeInput {
  @Field()
  declare id: string

  @Field(() => EdgeType)
  declare type?: EdgeType

  @Field()
  declare source?: string

  @Field()
  declare target?: string
}
