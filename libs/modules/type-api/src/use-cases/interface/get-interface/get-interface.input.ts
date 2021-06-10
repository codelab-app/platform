import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetInterfaceInput {
  @Field()
  declare interfaceId: string
}
