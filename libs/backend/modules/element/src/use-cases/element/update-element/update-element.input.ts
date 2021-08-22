import { Field, InputType, PickType } from '@nestjs/graphql'
import { CreateElementInput } from '../create-element'

@InputType()
export class UpdateElementData extends PickType(CreateElementInput, [
  'name',
  'atomId',
  'componentId',
]) {
  @Field(() => String, { nullable: true })
  declare css: string | null
}

// Note that moveElement is there for updating order and parent
@InputType()
export class UpdateElementInput {
  @Field(() => UpdateElementData)
  declare data: UpdateElementData

  @Field()
  declare id: string
}
