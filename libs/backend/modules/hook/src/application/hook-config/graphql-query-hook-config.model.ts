import { Field, ObjectType } from '@nestjs/graphql'
import { GraphqlQueryHookConfig } from '../../domain/hook-config/graphql-query-hook-config.schema'

@ObjectType('GraphqlQueryHookConfig')
export class GraphqlQueryHookConfigModel implements GraphqlQueryHookConfig {
  @Field()
  body: string

  @Field()
  url: string

  @Field({ nullable: true })
  dataKey?: string

  constructor({ body, url, dataKey }: GraphqlQueryHookConfigModel) {
    this.body = body
    this.url = url
    this.dataKey = dataKey
  }
}
