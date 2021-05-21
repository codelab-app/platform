import { Field, InputType, PickType } from '@nestjs/graphql'
import { CreateAtomInput } from '../create-atom'

@InputType()
export class UpdateAtomData extends PickType(CreateAtomInput, ['type']) {}

@InputType()
export class UpdateAtomInput {
  @Field()
  declare atomId: string

  @Field(() => UpdateAtomData)
  declare updateData: UpdateAtomData
}
