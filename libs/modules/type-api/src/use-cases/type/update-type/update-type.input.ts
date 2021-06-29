import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateEnumTypeValueData {
  @Field(() => String, { nullable: true })
  declare name: string | null

  @Field()
  declare value: string
}

@InputType()
export class UpdateTypeData {
  @Field()
  declare name: string

  @Field(() => [UpdateEnumTypeValueData])
  declare allowedValues: Array<UpdateEnumTypeValueData>
}

@InputType()
export class UpdateTypeInput {
  @Field(() => UpdateTypeData)
  declare updateData: UpdateTypeData

  @Field()
  declare typeId: string
}
