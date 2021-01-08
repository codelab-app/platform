import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetGraphRequest {
  @Field({ nullable: true })
  declare graphId?: string

  @Field({ nullable: true })
  declare pageId?: string
}
