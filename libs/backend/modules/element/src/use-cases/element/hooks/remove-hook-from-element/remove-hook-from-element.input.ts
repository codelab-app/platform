import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class RemoveHookFromElementInput {
  @Field()
  declare elementId: string

  @Field()
  declare hookId: string
}
