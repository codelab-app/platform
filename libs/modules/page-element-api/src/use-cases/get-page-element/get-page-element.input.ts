import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetPageElementInput {
  @Field()
  declare pageElementId: string
}
