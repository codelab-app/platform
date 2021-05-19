import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DeleteUsersResponse {
  @Field(() => Int)
  declare numberAffected: number
}
