import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TypesByIdsFilter {
  @Field(() => [String])
  declare typeIds: Array<string>
}

@InputType()
export class GetTypesInput {
  @Field(() => TypesByIdsFilter, { nullable: true })
  declare byIds?: TypesByIdsFilter
}
