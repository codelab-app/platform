import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateGraphInput {
  @Field()
  declare label: string
}
