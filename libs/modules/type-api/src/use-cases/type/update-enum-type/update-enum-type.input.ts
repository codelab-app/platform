import { Field, InputType } from '@nestjs/graphql'
import { UpdateEnumTypeValueData } from '../update-type'

@InputType()
export class UpdateEnumTypeData {
  @Field(() => [String])
  declare values: Array<string>

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
