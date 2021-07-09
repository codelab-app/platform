import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PropsByElementFilter {
  @Field(() => [String])
  declare elementIds: Array<string>

  @Field({ nullable: true, defaultValue: null })
  declare fieldId?: string
}

@InputType()
export class PropsByIdsFilter {
  @Field(() => [String])
  declare propIds: Array<string>
}

@InputType()
export class PropsByInterfaceValueId {
  @Field(() => String)
  declare interfaceValueId: string
}

@InputType()
export class GetPropsInput {
  @Field(() => PropsByElementFilter, { nullable: true })
  declare byElement?: PropsByElementFilter | null

  @Field(() => PropsByIdsFilter, { nullable: true })
  declare byIds?: PropsByIdsFilter | null

  @Field(() => PropsByInterfaceValueId, { nullable: true })
  declare byInterfaceValue?: PropsByInterfaceValueId | null
}
