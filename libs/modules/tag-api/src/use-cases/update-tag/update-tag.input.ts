import { Field, InputType, PickType } from '@nestjs/graphql'
import { CreateTagInput } from '../create-tag'

@InputType()
export class UpdateTagData extends PickType(CreateTagInput, ['name']) {}

@InputType()
export class UpdateTagInput {
  @Field()
  declare id: string

  @Field(() => UpdateTagData)
  declare data: UpdateTagData
}
