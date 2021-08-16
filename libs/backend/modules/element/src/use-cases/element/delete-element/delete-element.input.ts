import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteElementInput {
  @Field(() => String)
  declare elementId: string
}
