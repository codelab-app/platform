import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteTypeInput {
  @Field(() => [String])
  declare ids: Array<string>
}
