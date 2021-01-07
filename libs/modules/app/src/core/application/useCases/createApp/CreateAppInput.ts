import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateAppInput {
  @Field()
  declare title: string
}
