import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetGraphRequest {
  @Field()
  declare graphId: string
}
