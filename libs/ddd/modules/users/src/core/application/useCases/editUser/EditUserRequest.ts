import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class EditUserRequest {
  @Field()
  declare userId: string

  @Field()
  declare email: string
}
