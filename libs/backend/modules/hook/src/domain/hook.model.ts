import { Prop } from '@codelab/backend/modules/prop'
import { AtomType, IHook } from '@codelab/shared/abstract/core'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Hook implements IHook {
  @Field(() => ID)
  id: string

  @Field(() => AtomType)
  type: AtomType

  @Field(() => Prop)
  config: Prop

  constructor({ id, config, type }: IHook) {
    this.id = id
    this.type = type
    this.config = config
  }
}
