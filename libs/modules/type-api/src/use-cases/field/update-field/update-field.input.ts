import { Field, InputType, PickType } from '@nestjs/graphql'
import { CreateFieldInput } from '../create-field'

@InputType()
export class UpdateFieldData extends PickType(CreateFieldInput, [
  'key',
  'description',
  'name',
  'type',
]) {}

@InputType()
export class UpdateFieldInput {
  @Field()
  declare fieldId: string

  @Field(() => UpdateFieldData)
  declare updateData: UpdateFieldData
}
