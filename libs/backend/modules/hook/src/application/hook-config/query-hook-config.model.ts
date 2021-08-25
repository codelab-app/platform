import { Field, ObjectType } from '@nestjs/graphql'
import { QueryHookConfig, QueryMethod } from '../../domain'

@ObjectType('QueryHookConfig')
export class QueryHookConfigModel implements QueryHookConfig {
  @Field()
  queryKey: string

  @Field()
  url: string

  @Field(() => String, { nullable: true })
  body?: string | null

  @Field(() => QueryMethod)
  method: QueryMethod

  constructor({ queryKey, method, url, body }: QueryHookConfigModel) {
    this.queryKey = queryKey
    this.url = url
    this.body = body
    this.method = method
  }
}
