import { Field, InputType } from '@nestjs/graphql'
import { UserWhereUniqueInput } from '../get-user'

@InputType()
export class UpsertUserDataInput {
  @Field()
  declare auth0Id: string
}

@InputType()
export class UpsertUserInput {
  @Field(() => UpsertUserDataInput)
  declare data: UpsertUserDataInput

  @Field(() => UserWhereUniqueInput, { nullable: true })
  declare where?: UserWhereUniqueInput
}
