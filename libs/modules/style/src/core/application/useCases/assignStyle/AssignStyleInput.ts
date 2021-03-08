import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AssignStyleInput {
  @Field()
  declare styleId: string

  @Field()
  declare vertexId: string
}
