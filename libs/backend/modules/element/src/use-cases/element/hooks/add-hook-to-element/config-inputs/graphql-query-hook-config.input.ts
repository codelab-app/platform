import { GraphqlQueryHookConfig } from '@codelab/backend/modules/hook'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GraphqlQueryHookConfigInput implements GraphqlQueryHookConfig {
  @Field(() => String)
  declare url: string

  @Field(() => String)
  declare body: string

  @Field(() => String, { nullable: true })
  declare dataKey?: string
}
