import { QueryHookConfig } from '@codelab/backend/modules/hook'
import { QueryMethod } from '@codelab/shared/enums'
import { Field, InputType, registerEnumType } from '@nestjs/graphql'

registerEnumType(QueryMethod, { name: 'QueryMethod' })

@InputType({
  description: 'Provide either a lambdaId, or body/method/url',
})
export class QueryHookConfigInput implements QueryHookConfig {
  @Field()
  declare queryKey: string

  @Field(() => String, { nullable: true })
  declare url: string

  @Field(() => String, { nullable: true })
  declare body?: string

  @Field(() => QueryMethod, { nullable: true })
  declare method: QueryMethod

  @Field(() => String, { nullable: true })
  declare lambdaId?: string
}
