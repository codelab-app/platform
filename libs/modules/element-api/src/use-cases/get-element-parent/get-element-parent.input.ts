import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetElementParentInput {
  @Field()
  declare elementId: string
}
