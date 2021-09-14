import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeletePropMapBindingInput {
  @Field(() => [String])
  declare propMapBindingIds: Array<string>
}
