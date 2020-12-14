import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteUserRequest {
  @Field()
  declare email: string
}
