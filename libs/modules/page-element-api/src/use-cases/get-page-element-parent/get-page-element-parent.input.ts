import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetPageElementParentInput {
  @Field()
  declare pageElementId: string
}
