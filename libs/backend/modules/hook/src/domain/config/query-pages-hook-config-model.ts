import {
  HookDiscriminator,
  IQueryPagesHookConfig,
} from '@codelab/shared/abstract/core'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType(HookDiscriminator.QueryPagesHookConfig)
export class QueryPagesHookConfig implements IQueryPagesHookConfig {
  @Field()
  appId: string

  constructor({ appId }: IQueryPagesHookConfig) {
    this.appId = appId
  }
}
