import { Role } from '@codelab/shared/abstract/core'
import { Field, InputType } from '@nestjs/graphql'
import { UserWhereUniqueInput } from '../get-user'

@InputType()
export class UpsertUserDataInput {
  @Field()
  declare auth0Id: string

  @Field(() => [Role])
  declare roles: Array<Role>
}

@InputType()
export class UpsertUserInput {
  @Field(() => UpsertUserDataInput)
  declare data: UpsertUserDataInput

  @Field(() => UserWhereUniqueInput, { nullable: true })
  declare where?: UserWhereUniqueInput
}
