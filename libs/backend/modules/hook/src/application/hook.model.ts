import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { HookType } from '../domain'
import { HookConfigModel } from './hook-config'

registerEnumType(HookType, { name: 'HookType' })

/**
 * Hook Graphql Model
 */
@ObjectType('Hook')
export class HookModel {
  @Field()
  declare id: string

  @Field(() => HookType)
  declare type: HookType

  @Field(() => HookConfigModel)
  declare config: HookConfigModel
}
