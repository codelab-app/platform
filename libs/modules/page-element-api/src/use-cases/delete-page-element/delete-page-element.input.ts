import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeletePageElementInput {
  @Field(() => String)
  declare pageElementId: string
}
