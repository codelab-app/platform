import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserWhereUniqueInput {
  @Field({ nullable: true })
  declare id?: string

  @Field({ nullable: true })
  declare auth0Id?: string
}

@InputType()
export class GetUserInput extends UserWhereUniqueInput {}
