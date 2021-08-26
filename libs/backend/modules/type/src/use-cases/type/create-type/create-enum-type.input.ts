import { Field, InputType } from '@nestjs/graphql'
import { CreateEnumTypeValueInput } from './create-enum-type-value.input'

@InputType()
export class CreateEnumTypeInput {
  @Field(() => [CreateEnumTypeValueInput])
  declare allowedValues: Array<CreateEnumTypeValueInput>
}
