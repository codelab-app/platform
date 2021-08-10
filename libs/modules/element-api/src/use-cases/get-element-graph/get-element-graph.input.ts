import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetElementGraphInput {
  @Field()
  declare elementId: string
}
