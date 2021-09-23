import { Field, ObjectType } from '@nestjs/graphql'
import { QueryPageHookConfig } from '../../domain'

@ObjectType('QueryPageHookConfig')
export class QueryPageHookConfigModel implements QueryPageHookConfig {
  @Field()
  pageId: string

  constructor({ pageId }: QueryPageHookConfig) {
    this.pageId = pageId
  }
}
