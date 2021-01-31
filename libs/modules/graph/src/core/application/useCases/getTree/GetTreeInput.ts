import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetTreeInput {
  @Field()
  declare graphId: string
}
