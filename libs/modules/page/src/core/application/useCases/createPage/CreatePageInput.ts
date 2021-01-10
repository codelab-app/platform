import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreatePageInput {
  @Field()
  declare title: string

  @Field()
  declare appId: string
}
