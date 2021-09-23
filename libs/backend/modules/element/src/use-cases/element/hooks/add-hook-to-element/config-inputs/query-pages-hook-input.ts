import { QueryPagesHookConfig } from '@codelab/backend/modules/hook'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class QueryPagesHookConfigInput implements QueryPagesHookConfig {
  @Field(() => String)
  declare appId: string
}
