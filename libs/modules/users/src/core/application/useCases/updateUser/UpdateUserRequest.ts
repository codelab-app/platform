import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateUserRequest {
  @Field()
  declare userId: string

  @Field()
  declare email: string
}
