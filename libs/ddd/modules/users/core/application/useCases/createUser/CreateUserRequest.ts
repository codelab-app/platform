import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserRequest {
  @Field()
  declare email: string

  @Field()
  declare password: string
}
