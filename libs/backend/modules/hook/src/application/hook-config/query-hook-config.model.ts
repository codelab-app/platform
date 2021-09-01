import { QueryMethod } from '@codelab/shared/enums'
import { Field, ObjectType } from '@nestjs/graphql'
import { QueryHookConfig } from '../../domain'

@ObjectType('QueryHookConfig')
export class QueryHookConfigModel implements QueryHookConfig {
  @Field()
  queryKey: string

  @Field({ nullable: true })
  url?: string

  @Field(() => String, { nullable: true })
  body?: string | null

  @Field(() => QueryMethod, { nullable: true })
  method?: QueryMethod

  @Field({ nullable: true })
  lambdaId?: string

  constructor({ queryKey, method, url, body, lambdaId }: QueryHookConfigModel) {
    this.queryKey = queryKey
    this.url = url
    this.body = body
    this.method = method
    this.lambdaId = lambdaId
  }
}
