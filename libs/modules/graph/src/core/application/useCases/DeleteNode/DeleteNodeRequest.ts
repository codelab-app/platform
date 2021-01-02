import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteNodeRequest {
  @Field()
  declare vertexId: string
}
