import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTagInput {
  @Field()
  declare name: string
}
