import { HookType } from '@codelab/shared/abstract/core'
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { HookConfigModel } from './hook-config'

registerEnumType(HookType, { name: 'HookType' })

/**
 * Hook Graphql Model
 */
@ObjectType('Hook')
export class HookModel {
  @Field(() => ID)
  declare id: string

  @Field(() => HookType)
  declare type: HookType

  @Field(() => HookConfigModel)
  declare config: HookConfigModel
}
