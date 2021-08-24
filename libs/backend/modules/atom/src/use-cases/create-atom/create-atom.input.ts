import { Field, InputType } from '@nestjs/graphql'
import { AtomType } from '../../domain/atom-type.model'

@InputType()
export class CreateAtomInput {
  @Field()
  declare name: string

  @Field(() => AtomType)
  declare type: AtomType
}
