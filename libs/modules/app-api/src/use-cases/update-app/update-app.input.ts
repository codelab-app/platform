import { Field, InputType, PickType } from '@nestjs/graphql'
import { CreateAppInput } from '../create-app'

@InputType()
export class UpdateAppData extends PickType(CreateAppInput, ['name']) {}

@InputType()
export class UpdateAppInput {
  @Field()
  declare appId: string

  @Field(() => UpdateAppData)
  declare updateData: UpdateAppData
}
