import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetLastOrderChildInput {
  @Field()
  declare pageElementId: string
}
