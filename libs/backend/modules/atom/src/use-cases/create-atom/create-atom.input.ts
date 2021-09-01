import { AtomType } from '@codelab/shared/enums'
import { Field, InputType } from '@nestjs/graphql'

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
