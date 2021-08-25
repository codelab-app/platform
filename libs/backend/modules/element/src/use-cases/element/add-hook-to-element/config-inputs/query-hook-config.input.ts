import { QueryHookConfig, QueryMethod } from '@codelab/backend/modules/hook'
import { Field, InputType, registerEnumType } from '@nestjs/graphql'

registerEnumType(QueryMethod, { name: 'QueryMethod' })

@InputType()
export class QueryHookConfigInput implements QueryHookConfig {
  @Field()
  declare queryKey: string

  @Field()
  declare url: string

  @Field(() => String, { nullable: true })
  declare body?: string

  @Field(() => QueryMethod)
  declare method: QueryMethod

  @Field(() => String, { nullable: true })
  declare dataPropKey?: string

  @Field(() => String, { nullable: true })
  declare loadingPropKey?: string

  @Field(() => String, { nullable: true })
  declare errorPropKey?: string
}
