import { Field, InputType } from '@nestjs/graphql'
import {
  GraphqlQueryHookConfigInput,
  QueryHookConfigInput,
} from './config-inputs'

@InputType({
  description: 'Provide exactly one of the config fields',
})
export class AddHookToElementInput {
  @Field()
  declare elementId: string

  @Field(() => QueryHookConfigInput, { nullable: true })
  declare queryHook?: QueryHookConfigInput

  @Field(() => GraphqlQueryHookConfigInput, { nullable: true })
  declare graphqlQueryHook?: GraphqlQueryHookConfigInput
}
