import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteVertexInput {
  @Field()
  declare vertexId: string
}
