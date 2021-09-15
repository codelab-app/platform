import { Field, InputType, PickType } from '@nestjs/graphql'
import { CreateElementInput } from '../create-element'

@InputType()
export class UpdateElementData extends PickType(CreateElementInput, [
  'name',
  'atomId',
  'componentId',
]) {
  @Field(() => String, { nullable: true })
  declare css?: string | null

  @Field(() => String, {
    description:
      'If set, the element will get rendered for each item in the array found in its props by the given key, if it exists',
    nullable: true,
  })
  renderForEachPropKey?: string

  @Field(() => String, {
    description:
      'If set, the element will get rendered only if the prop with the given key exists and is evaluated as truthy (exception - the string "false" will evaluate to falsy)',
    nullable: true,
  })
  renderIfPropKey?: string

  @Field(() => String, {
    nullable: true,
  })
  propTransformationJs?: string
}

// Note that moveElement is there for updating order and parent
@InputType()
export class UpdateElementInput {
  @Field(() => UpdateElementData)
  declare data: UpdateElementData

  @Field()
  declare id: string
}
