import { RecoilStateHookConfig } from '@codelab/backend/modules/hook'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class RecoilStateHookConfigInput implements RecoilStateHookConfig {
  @Field(() => String)
  declare stateKey: string

  @Field(() => String, { nullable: true })
  declare defaultValue?: string
}
