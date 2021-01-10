import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput {
  @Field()
  declare id: string

  @Field()
  declare email: string
}
