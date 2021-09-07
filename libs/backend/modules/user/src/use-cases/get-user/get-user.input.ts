import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserWhereUniqueInput {
  @Field()
  declare id: string
}

@InputType()
export class GetUserInput extends UserWhereUniqueInput {}
