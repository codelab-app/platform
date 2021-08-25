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

  @Field(() => String, { nullable: true })
  dataPropKey?: string

  @Field(() => String, { nullable: true })
  loadingPropKey?: string

  @Field(() => String, { nullable: true })
  errorPropKey?: string

  constructor({
    queryKey,
    method,
    url,
    body,
    errorPropKey,
    loadingPropKey,
    dataPropKey,
  }: QueryHookConfigModel) {
    this.queryKey = queryKey
    this.url = url
    this.body = body
    this.method = method
    this.errorPropKey = errorPropKey
    this.loadingPropKey = loadingPropKey
    this.dataPropKey = dataPropKey
  }
}
