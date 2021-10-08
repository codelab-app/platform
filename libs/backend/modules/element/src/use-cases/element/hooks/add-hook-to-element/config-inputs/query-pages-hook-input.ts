import { Model } from '@codelab/backend/abstract/core'
import { IQueryPagesHookConfig } from '@codelab/shared/abstract/core'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class QueryPagesHookConfigInput implements Model<IQueryPagesHookConfig> {
  @Field(() => String)
  declare appId: string
}
