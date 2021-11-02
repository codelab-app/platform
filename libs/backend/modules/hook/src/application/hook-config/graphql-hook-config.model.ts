import {
  HookDiscriminator,
  IGraphqlHookConfig,
} from '@codelab/shared/abstract/core'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType(HookDiscriminator.GraphqlHookConfig)
export class GraphqlHookConfig implements IGraphqlHookConfig {
  @Field()
  graphqlBody: string

  @Field()
  graphqlUrl: string

  @Field(() => String, { nullable: true })
  dataKey?: string | null

  constructor({ graphqlBody, graphqlUrl, dataKey }: GraphqlHookConfig) {
    this.graphqlBody = graphqlBody
    this.graphqlUrl = graphqlUrl
    this.dataKey = dataKey
  }
}
