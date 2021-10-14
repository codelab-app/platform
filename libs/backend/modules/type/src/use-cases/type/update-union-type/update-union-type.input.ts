import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateUnionTypeData {
  @Field()
  declare name: string

  @Field(() => [String])
  declare typeIdsOfUnionType: Array<string>

  @Field(() => [String], { nullable: true })
  declare tagIds: Array<string>
}

@InputType()
export class UpdateUnionTypeInput {
  @Field(() => UpdateUnionTypeData)
  declare updateData: UpdateUnionTypeData

  @Field()
  declare typeId: string
}
