import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdatePageInput {
  @Field({ nullable: true })
  declare title?: string

  @Field()
  declare pageId: string
}
