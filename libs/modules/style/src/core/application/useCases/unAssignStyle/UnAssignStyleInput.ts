import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UnAssignStyleInput {
  @Field()
  declare styleId: string

  @Field()
  declare vertexId: string
}
