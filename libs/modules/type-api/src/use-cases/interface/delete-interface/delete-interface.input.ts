import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteInterfaceInput {
  @Field()
  declare interfaceId: string
}
