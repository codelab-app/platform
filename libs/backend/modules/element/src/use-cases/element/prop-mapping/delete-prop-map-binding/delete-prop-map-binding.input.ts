import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeletePropMapBindingInput {
  @Field()
  declare elementId: string

  @Field(() => [String])
  declare propMapBindingIds: Array<string>
}
