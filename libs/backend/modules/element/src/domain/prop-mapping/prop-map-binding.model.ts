import { Nullable } from '@codelab/shared/abstract/types'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PropMapBinding {
  @Field(() => ID)
  id: string

  @Field(() => String, {
    nullable: true,
    description:
      'The ID of the target element, if omitted, the current element will be the target',
  })
  targetElementId?: Nullable<string>

  @Field({
    description: 'The key of the prop, as received in the source element',
  })
  sourceKey: string

  @Field({
    description: 'The key of the prop, that the target Element will receive',
  })
  targetKey: string

  // add transformer? lambda? something else to modify the prop?

  constructor({ id, targetElementId, targetKey, sourceKey }: PropMapBinding) {
    this.id = id
    this.targetElementId = targetElementId
    this.targetKey = targetKey
    this.sourceKey = sourceKey
  }
}
