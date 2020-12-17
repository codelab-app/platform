import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateUserRequest {
  @Field()
  declare id: string

  @Field()
  declare email: string
}
