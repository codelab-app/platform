import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetPageInput {
  @Field()
  declare pageId: string
}
