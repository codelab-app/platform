import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetElementAggregateInput {
  @Field()
  declare elementId: string
}
