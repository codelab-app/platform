import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteUsersInput {
  @Field(() => [String])
  declare ids: Array<string>
}
