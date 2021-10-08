import {
  HookDiscriminator,
  IQueryPageHookConfig,
} from '@codelab/shared/abstract/core'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType(HookDiscriminator.QueryPageHookConfig)
export class QueryPageHookConfig implements IQueryPageHookConfig {
  @Field()
  pageId: string

  constructor({ pageId }: IQueryPageHookConfig) {
    this.pageId = pageId
  }
}
