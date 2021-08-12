import { Field, InputType, PickType } from '@nestjs/graphql'
import { CreateComponentInput } from '../create-component'

@InputType()
export class UpdateComponentData extends PickType(CreateComponentInput, [
  'name',
]) {}

@InputType()
export class UpdateComponentInput {
  @Field()
  declare componentId: string

  @Field()
  declare updateData: UpdateComponentData
}
