import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateInterfaceInput {
  @Field()
  declare name: string
}
