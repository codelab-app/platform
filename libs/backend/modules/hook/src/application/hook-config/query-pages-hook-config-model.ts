import { Field, ObjectType } from '@nestjs/graphql'
import { QueryPagesHookConfig } from '../../domain'

@ObjectType('QueryPagesHookConfig')
export class QueryPagesHookConfigModel implements QueryPagesHookConfig {
  @Field()
  appId: string

  constructor({ appId }: QueryPagesHookConfig) {
    this.appId = appId
  }
}
