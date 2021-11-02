import { Model } from '@codelab/backend/abstract/core'
import {
  IRecoilStateHookConfig,
  PersistenceType,
} from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class RecoilStateHookConfigInput
  implements Model<IRecoilStateHookConfig>
{
  @Field(() => String)
  declare stateKey: string

  @Field(() => String, { nullable: true })
  declare defaultValue?: Maybe<string>

  @Field(() => PersistenceType)
  declare persisted: PersistenceType
}
