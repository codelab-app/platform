import { Field, ObjectType } from '@nestjs/graphql'
import { GraphqlHookConfig } from '../../domain'

@ObjectType('GraphqlHookConfig')
export class GraphqlHookConfigModel implements GraphqlHookConfig {
  @Field()
  body: string

  @Field()
  url: string

  @Field({ nullable: true })
  dataKey?: string

  constructor({ body, url, dataKey }: GraphqlHookConfigModel) {
    this.body = body
    this.url = url
    this.dataKey = dataKey
  }
}
