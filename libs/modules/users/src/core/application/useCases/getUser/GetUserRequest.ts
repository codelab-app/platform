import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetUserRequest {
  @Field()
  declare email: string
}
