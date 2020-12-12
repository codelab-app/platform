import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class EditUserRequest {
  @Field()
  declare email: string
}
