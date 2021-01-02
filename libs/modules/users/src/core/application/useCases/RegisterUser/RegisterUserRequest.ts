import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class RegisterUserRequest {
  @Field()
  declare email: string

  @Field()
  declare password: string
}
