import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteEdgeRequest {
  @Field()
  declare id: string
}
