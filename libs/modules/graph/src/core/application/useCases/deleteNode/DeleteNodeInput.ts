import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteNodeInput {
  @Field()
  declare vertexId: string
}
