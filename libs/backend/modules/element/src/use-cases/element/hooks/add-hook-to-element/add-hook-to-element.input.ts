import { Field, InputType } from '@nestjs/graphql'
import {
  GraphqlHookConfigInput,
  QueryHookConfigInput,
  QueryPageHookConfigInput,
  QueryPagesHookConfigInput,
} from './config-inputs'
import { RecoilStateHookConfigInput } from './config-inputs/recoil-state-hook-config.input'

@InputType({
  description: 'Provide exactly one of the config fields',
})
export class AddHookToElementInput {
  @Field()
  declare elementId: string

  @Field(() => QueryHookConfigInput, { nullable: true })
  declare queryHook?: QueryHookConfigInput

  @Field(() => GraphqlHookConfigInput, { nullable: true })
  declare graphqlQueryHook?: GraphqlHookConfigInput

  @Field(() => GraphqlHookConfigInput, { nullable: true })
  declare graphqlMutationHook?: GraphqlHookConfigInput

  @Field(() => RecoilStateHookConfigInput, { nullable: true })
  declare recoilStateHook?: RecoilStateHookConfigInput

  @Field(() => QueryPageHookConfigInput, { nullable: true })
  declare queryPageHook?: QueryPageHookConfigInput

  @Field(() => QueryPagesHookConfigInput, { nullable: true })
  declare queryPagesHook?: QueryPagesHookConfigInput
}
