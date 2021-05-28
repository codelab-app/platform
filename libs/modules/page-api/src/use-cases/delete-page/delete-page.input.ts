import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeletePageInput {
  @Field()
  declare pageId: string
}
