import { AtomType } from '@codelab/codegen/dgraph'
import { Field, InputType } from '@nestjs/graphql'
import { AtomTypeEnum } from '../../atom-type.model'

@InputType()
export class CreateAtomInput {
  @Field()
  declare label: string

  @Field(() => AtomTypeEnum)
  declare type: AtomType
}
