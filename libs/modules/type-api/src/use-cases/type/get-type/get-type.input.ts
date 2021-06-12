import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetTypeInput {
  @Field()
  declare typeId: string
}
