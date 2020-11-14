import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserInput {
  @Field()
  declare username: string

  @Field()
  declare password: string
}
