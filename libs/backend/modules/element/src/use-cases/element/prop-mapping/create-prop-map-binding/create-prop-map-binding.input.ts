import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreatePropMapBindingInput {
  @Field()
  declare elementId: string

  @Field({
    nullable: true,
    description:
      'The ID of the target element, if omitted, the current element will be the target',
  })
  declare targetElementId?: string

  @Field({
    description: 'The key of the prop, as received in the source element',
  })
  declare sourceKey: string

  @Field({
    description: 'The key of the prop, that the target Element will receive',
  })
  declare targetKey: string
}
