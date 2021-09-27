import { Field, InputType } from '@nestjs/graphql'
import { CreateTagInput } from '../create-tag'

@InputType()
export class TagWhereUniqueInput {
  @Field({ nullable: true })
  declare id?: string

  @Field({ nullable: true })
  declare name?: string
}

@InputType()
export class UpsertTagInput {
  @Field(() => CreateTagInput)
  declare data: CreateTagInput

  @Field(() => TagWhereUniqueInput, { nullable: true })
  declare where?: TagWhereUniqueInput
}
