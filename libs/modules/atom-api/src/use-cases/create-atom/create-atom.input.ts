import { Field, InputType } from '@nestjs/graphql'
import { AtomTypeEnum } from '../../atom-type.model'

@InputType()
export class CreateAtomInput {
  @Field()
  declare name: string

  @Field(() => AtomTypeEnum)
  declare type: AtomTypeEnum
}
