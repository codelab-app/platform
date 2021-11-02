import { Model } from '@codelab/backend/abstract/core'
import { IQueryPageHookConfig } from '@codelab/shared/abstract/core'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class QueryPageHookConfigInput implements Model<IQueryPageHookConfig> {
  @Field(() => String)
  declare pageId: string
}
