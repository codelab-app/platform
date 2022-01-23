import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ExecuteCommandInput {
  @Field()
  declare command: string
}
