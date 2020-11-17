import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserInput {
  @Field()
  declare email: string

  @Field()
  declare password: string
}
