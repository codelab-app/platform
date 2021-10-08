import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetTagsInput {
  @Field(() => [String], { nullable: true })
  declare ids?: Array<string>
}
