import { Field, InputType } from '@nestjs/graphql'
import { CreateAtomInput } from '../create-atom'

// @InputType()
// export class UpdateAtomData extends PickType(CreateAtomInput, ['type']) {}

@InputType()
export class UpdateAtomInput {
  @Field()
  declare id: string

  @Field(() => CreateAtomInput)
  declare data: CreateAtomInput
}
