import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DuplicateElementInput {
  @Field()
  declare elementId: string
}
