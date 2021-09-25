import { PersistenceType } from '@codelab/shared/abstract/core'
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { RecoilStateHookConfig } from '../../domain'

registerEnumType(PersistenceType, {
  name: 'PersistenceType',
})

@ObjectType('RecoilStateHookConfig')
export class RecoilStateHookConfigModel implements RecoilStateHookConfig {
  @Field()
  stateKey: string

  @Field({ nullable: true })
  defaultValue?: string

  @Field(() => PersistenceType)
  declare persisted: PersistenceType

  constructor({
    stateKey,
    defaultValue,
    persisted,
  }: RecoilStateHookConfigModel) {
    this.stateKey = stateKey
    this.defaultValue = defaultValue
    this.persisted = persisted
  }
}
