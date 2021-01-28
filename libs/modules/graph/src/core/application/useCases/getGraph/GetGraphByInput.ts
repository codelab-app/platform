import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetGraphByInput {
  @Field({ nullable: true })
  declare appId?: string

  @Field({ nullable: true })
  declare pageId?: string
}
