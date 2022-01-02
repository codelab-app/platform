import {
  HookDiscriminator,
  IGraphqlHookConfig,
} from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType(HookDiscriminator.GraphqlHookConfig)
export class GraphqlHookConfig implements IGraphqlHookConfig {
  @Field()
  graphqlBody: string

  @Field()
  graphqlUrl: string

  @Field(() => String, { nullable: true })
  dataKey?: Nullable<string>

  constructor({ graphqlBody, graphqlUrl, dataKey }: GraphqlHookConfig) {
    this.graphqlBody = graphqlBody
    this.graphqlUrl = graphqlUrl
    this.dataKey = dataKey
  }
}
