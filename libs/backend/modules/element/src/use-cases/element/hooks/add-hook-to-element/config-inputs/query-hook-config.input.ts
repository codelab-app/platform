import { Model } from '@codelab/backend/abstract/core'
import { IQueryHookConfig, QueryMethod } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Field, InputType, registerEnumType } from '@nestjs/graphql'

registerEnumType(QueryMethod, { name: 'QueryMethod' })

@InputType({
  description: 'Provide either a lambdaId, or body/method/url',
})
export class QueryHookConfigInput implements Model<IQueryHookConfig> {
  @Field()
  declare queryKey: string

  @Field(() => String, { nullable: true })
  declare url?: string

  @Field(() => String, { nullable: true })
  declare body?: Maybe<string>

  @Field(() => QueryMethod, { nullable: true })
  declare method?: Maybe<QueryMethod>

  @Field(() => String, { nullable: true })
  declare lambdaId?: Maybe<string>
}
