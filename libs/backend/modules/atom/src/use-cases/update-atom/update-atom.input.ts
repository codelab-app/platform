import { Field, InputType } from '@nestjs/graphql'
import { CreateAtomInput } from '../create-atom'

@InputType()
export class UpdateAtomInput {
  @Field()
  declare id: string

  @Field(() => CreateAtomInput)
  declare data: CreateAtomInput
}
