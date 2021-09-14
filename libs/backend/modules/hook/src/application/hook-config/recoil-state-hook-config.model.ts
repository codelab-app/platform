import { Field, ObjectType } from '@nestjs/graphql'
import { RecoilStateHookConfig } from '../../domain'

@ObjectType('RecoilStateHookConfig')
export class RecoilStateHookConfigModel implements RecoilStateHookConfig {
  @Field()
  key: string

  @Field({ nullable: true })
  defaultValue?: string

  constructor({ key, defaultValue }: RecoilStateHookConfigModel) {
    this.key = key
    this.defaultValue = defaultValue
  }
}
