import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class MoveData {
  @Field(() => Int)
  declare order: number

  @Field()
  declare parentElementId: string
}

@InputType()
export class MovePageElementInput {
  @Field()
  declare pageElementId: string

  @Field(() => MoveData)
  declare moveData: MoveData
}
