import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteTagsInput {
  @Field(() => [String])
  declare ids: Array<string>
}
