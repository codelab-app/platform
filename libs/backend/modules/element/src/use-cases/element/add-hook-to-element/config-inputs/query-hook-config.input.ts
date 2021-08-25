import { QueryHookConfig, QueryMethod } from '@codelab/backend/modules/hook'
import { Field, InputType, registerEnumType } from '@nestjs/graphql'

registerEnumType(QueryMethod, { name: 'QueryMethod' })

@InputType()
export class QueryHookConfigInput implements QueryHookConfig {
  @Field()
  queryKey: string

  @Field()
  url: string

  @Field(() => String, { nullable: true })
  body?: string

  @Field(() => QueryMethod)
  method: QueryMethod

  constructor(
    queryKey: string,
    url: string,
    body: string,
    method: QueryMethod,
  ) {
    this.queryKey = queryKey
    this.url = url
    this.body = body
    this.method = method
  }
}
