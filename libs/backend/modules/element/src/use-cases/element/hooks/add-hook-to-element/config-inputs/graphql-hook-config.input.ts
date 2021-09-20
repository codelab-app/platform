import { GraphqlHookConfig } from '@codelab/backend/modules/hook'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GraphqlHookConfigInput implements GraphqlHookConfig {
  @Field(() => String)
  declare url: string

  @Field(() => String)
  declare body: string

  @Field(() => String, { nullable: true })
  declare dataKey?: string
}
