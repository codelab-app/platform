import { Field, ObjectType } from '@nestjs/graphql'
import { RecoilStateHookConfig } from '../../domain'

@ObjectType('RecoilStateHookConfig')
export class RecoilStateHookConfigModel implements RecoilStateHookConfig {
  @Field()
  stateKey: string

  @Field({ nullable: true })
  defaultValue?: string

  constructor({ stateKey, defaultValue }: RecoilStateHookConfigModel) {
    this.stateKey = stateKey
    this.defaultValue = defaultValue
  }
}
