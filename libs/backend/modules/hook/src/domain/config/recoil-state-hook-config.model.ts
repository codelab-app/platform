import {
  HookDiscriminator,
  IRecoilStateHookConfig,
  PersistenceType,
} from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'

registerEnumType(PersistenceType, {
  name: 'PersistenceType',
})

@ObjectType(HookDiscriminator.RecoilStateHookConfig)
export class RecoilStateHookConfig implements IRecoilStateHookConfig {
  @Field()
  stateKey: string

  @Field(() => String, { nullable: true })
  defaultValue?: Nullable<string>

  @Field(() => PersistenceType)
  declare persisted: PersistenceType

  constructor({ stateKey, defaultValue, persisted }: RecoilStateHookConfig) {
    this.stateKey = stateKey
    this.defaultValue = defaultValue
    this.persisted = persisted
  }
}
