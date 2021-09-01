import { Field, InputType } from '@nestjs/graphql'
import { AtomType } from '../../domain/atom-type.model'

@InputType()
export class CreateAtomInput {
  @Field()
  declare name: string

  @Field(() => AtomType)
  declare type: AtomType

  @Field({
    description: 'Pass in an existing interface ID to assign it to the atom',
    nullable: true,
  })
  declare api?: string
}
