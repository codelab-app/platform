import { Field, InputType } from '@nestjs/graphql'
import { AtomType } from '../../atom-type.model'

@InputType()
export class CreateAtomInput {
  @Field()
  declare label: string

  @Field(() => AtomType)
  declare type: AtomType
}
