import { QueryPageHookConfig } from '@codelab/backend/modules/hook'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class QueryPageHookConfigInput implements QueryPageHookConfig {
  @Field(() => String)
  declare pageId: string
}
