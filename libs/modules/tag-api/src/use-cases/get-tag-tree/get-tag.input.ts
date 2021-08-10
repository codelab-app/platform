import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetTagInput {
  @Field()
  declare id: string
}
