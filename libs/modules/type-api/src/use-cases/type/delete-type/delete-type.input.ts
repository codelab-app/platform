import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteTypeInput {
  @Field()
  declare id: string
}
