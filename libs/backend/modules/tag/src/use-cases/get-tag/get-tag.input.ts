import { Field, InputType, PartialType, PickType } from '@nestjs/graphql'
import { CreateTagInput } from '../create-tag'

@InputType()
export class WhereUniqueTag extends PartialType(
  PickType(CreateTagInput, ['name']),
) {
  @Field({ nullable: true })
  declare id?: string
}

@InputType()
export class GetTagInput {
  @Field(() => WhereUniqueTag)
  declare where: WhereUniqueTag
}
