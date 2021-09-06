import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field()
  declare auth0Id: string
}
