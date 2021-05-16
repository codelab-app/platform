import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field()
  email: string

  constructor(email: string) {
    this.email = email
  }
}
