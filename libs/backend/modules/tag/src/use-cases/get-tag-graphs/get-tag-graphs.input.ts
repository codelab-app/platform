import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TagsWhereInput {
  @Field(() => [String], { nullable: true })
  declare ids?: Array<string>
}

@InputType()
export class GetTagGraphsInput {
  @Field(() => TagsWhereInput, { nullable: true })
  declare where?: TagsWhereInput
}
