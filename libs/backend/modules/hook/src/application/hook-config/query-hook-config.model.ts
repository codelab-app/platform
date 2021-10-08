import {
  HookDiscriminator,
  IQueryHookConfig,
  QueryMethod,
} from '@codelab/shared/abstract/core'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType(HookDiscriminator.QueryHookConfig)
export class QueryHookConfig implements IQueryHookConfig {
  @Field()
  queryKey: string

  @Field(() => String, { nullable: true })
  url?: string | null

  @Field(() => String, { nullable: true })
  body?: string | null

  @Field(() => QueryMethod, { nullable: true })
  method?: QueryMethod | null

  @Field(() => String, { nullable: true })
  lambdaId?: string | null

  constructor({ queryKey, method, url, body, lambdaId }: QueryHookConfig) {
    this.queryKey = queryKey
    this.url = url
    this.body = body
    this.method = method
    this.lambdaId = lambdaId
  }
}
