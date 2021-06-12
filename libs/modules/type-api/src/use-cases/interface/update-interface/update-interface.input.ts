import { Field, InputType, PickType } from '@nestjs/graphql'
import { CreateInterfaceInput } from '../create-interface'

@InputType()
export class UpdateInterfaceData extends PickType(CreateInterfaceInput, [
  'name',
]) {}

@InputType()
export class UpdateInterfaceInput {
  @Field()
  declare interfaceId: string

  @Field(() => UpdateInterfaceData)
  declare updateData: UpdateInterfaceData
}
