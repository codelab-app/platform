import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetElementInput {
  @Field()
  declare elementId: string
}
