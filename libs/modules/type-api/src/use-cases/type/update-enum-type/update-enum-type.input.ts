import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateEnumTypeValueData {
  @Field(() => String, { nullable: true })
  declare name: string | null

  @Field()
  declare value: string
}

@InputType()
export class UpdateEnumTypeData {
  @Field(() => [UpdateEnumTypeValueData])
  declare allowedValues: Array<UpdateEnumTypeValueData>

  @Field()
  declare name: string
}

@InputType()
export class UpdateEnumTypeInput {
  @Field()
  declare typeId: string

  @Field(() => UpdateEnumTypeData)
  declare updateData: UpdateEnumTypeData
}
