import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteUserInput {
  @Field()
  declare email: string
}
