import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class MoveVertexInput {
  @Field()
  declare currentVertexId: string

  @Field()
  declare parentVertexId: string
}
