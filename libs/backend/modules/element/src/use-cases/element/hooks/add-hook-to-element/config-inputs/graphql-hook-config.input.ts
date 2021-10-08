import { Model } from '@codelab/backend/abstract/core'
import { IGraphqlHookConfig } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GraphqlHookConfigInput implements Model<IGraphqlHookConfig> {
  @Field(() => String)
  declare graphqlUrl: string

  @Field(() => String)
  declare graphqlBody: string

  @Field(() => String, { nullable: true })
  declare dataKey?: Maybe<string>
}
