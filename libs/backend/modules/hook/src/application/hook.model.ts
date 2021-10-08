import { HookType, IHook } from '@codelab/shared/abstract/core'
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { HookConfig } from './hook-config'

registerEnumType(HookType, { name: 'HookType' })

/**
 * Hook Graphql Model
 */
@ObjectType('Hook')
export class HookModel implements IHook {
  @Field(() => ID)
  declare id: string

  @Field(() => HookType)
  declare type: HookType

  @Field(() => HookConfig)
  declare config: HookConfig

  constructor({ id, type, config }: IHook) {
    this.id = id
    this.type = type
    this.config = config
  }
}
