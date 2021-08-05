import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateComponentInput {
  @Field()
  declare name: string
}
