import {
  HookDiscriminator,
  IQueryLambdaHookConfig,
  QueryMethod,
} from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType(HookDiscriminator.QueryHookConfig)
export class QueryLambdaConfigHookConfig implements IQueryLambdaHookConfig {
  @Field()
  queryKey: string

  @Field(() => String, { nullable: true })
  url?: Nullable<string>

  @Field(() => String, { nullable: true })
  body?: Nullable<string>

  @Field(() => QueryMethod, { nullable: true })
  method?: Nullable<QueryMethod>

  @Field(() => String, { nullable: true })
  lambdaId: string

  constructor({
    queryKey,
    method,
    url,
    body,
    lambdaId,
  }: QueryLambdaConfigHookConfig) {
    this.queryKey = queryKey
    this.url = url
    this.body = body
    this.method = method
    this.lambdaId = lambdaId
  }
}
