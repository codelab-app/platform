import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class MoveData {
  @Field(() => Int)
  declare order: number

  @Field()
  declare parentElementId: string
}

@InputType()
export class MoveElementInput {
  @Field()
  declare elementId: string

  @Field(() => MoveData)
  declare moveData: MoveData
}
