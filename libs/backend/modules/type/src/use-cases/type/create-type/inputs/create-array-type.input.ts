import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateArrayTypeInput {
  @Field()
  declare itemTypeId: string
}
