import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteVertexRequest {
  @Field()
  declare id: string
}
