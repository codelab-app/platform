import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetUsersInput {
  @Field(() => [String], { nullable: true })
  declare userIds?: Array<string>
}
