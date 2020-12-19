import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetEdgeByIdRequest {
  @Field()
  declare id: string
}
