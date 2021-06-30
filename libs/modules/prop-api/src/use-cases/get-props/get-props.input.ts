import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PropsByPageElementFilter {
  @Field(() => [String])
  declare pageElementIds: Array<string>

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
  @Field(() => PropsByPageElementFilter, { nullable: true })
  declare byPageElement?: PropsByPageElementFilter | null

  @Field(() => PropsByIdsFilter, { nullable: true })
  declare byIds?: PropsByIdsFilter | null

  @Field(() => PropsByInterfaceValueId, { nullable: true })
  declare byInterfaceValue?: PropsByInterfaceValueId | null
}
