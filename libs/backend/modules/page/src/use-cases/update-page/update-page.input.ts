import { Field, InputType, PickType } from '@nestjs/graphql'
import { CreatePageInput } from '../create-page'

@InputType()
export class UpdatePageData extends PickType(CreatePageInput, ['name']) {}

@InputType()
export class UpdatePageInput {
  @Field()
  declare pageId: string

  @Field()
  declare updateData: UpdatePageData
}
