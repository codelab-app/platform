import { AtomTypeInput } from '@codelab/modules/atom-type-api'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateAtomInput {
  @Field(() => AtomTypeInput)
  declare type: AtomTypeInput
}
