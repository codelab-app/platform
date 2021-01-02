import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LoginUserRequest {
  @Field()
  declare email: string

  @Field()
  declare password: string
}
