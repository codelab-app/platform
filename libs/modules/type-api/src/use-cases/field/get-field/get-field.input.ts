import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FieldByInterfaceFilter {
  @Field()
  declare interfaceId: string

  @Field()
  declare fieldKey: string
}

@InputType()
export class FieldByIdFilter {
  @Field()
  declare fieldId: string
}

@InputType()
export class GetFieldInput {
  @Field(() => FieldByInterfaceFilter, { nullable: true })
  declare byInterface?: FieldByInterfaceFilter

  @Field(() => FieldByIdFilter, { nullable: true })
  declare byId?: FieldByIdFilter
}
