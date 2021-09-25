import { RecoilStateHookConfig } from '@codelab/backend/modules/hook'
import { PersistenceType } from '@codelab/shared/abstract/core'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class RecoilStateHookConfigInput implements RecoilStateHookConfig {
  @Field(() => String)
  declare stateKey: string

  @Field(() => String, { nullable: true })
  declare defaultValue?: string

  @Field(() => PersistenceType)
  declare persisted: PersistenceType
}
