import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreatePageInput {
  @Field()
  declare name: string

  @Field()
  declare appId: string
}
