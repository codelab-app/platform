import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class RegisterUserInput {
  @Field()
  declare email: string

  @Field()
  declare password: string
}
