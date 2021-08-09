import { Field, InputType, PartialType, PickType } from '@nestjs/graphql'
import { CreateAppInput } from '../create-app'

@InputType()
export class UpdateAppData extends PartialType(
  PickType(CreateAppInput, ['name']),
) {}

@InputType()
export class UpdateAppInput {
  @Field()
  declare id: string

  @Field(() => UpdateAppData)
  declare data: UpdateAppData
}
