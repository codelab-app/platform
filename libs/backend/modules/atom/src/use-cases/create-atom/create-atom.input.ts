import { Field, InputType } from '@nestjs/graphql'
import { AtomTypeEnum } from '../../domain/atom-type.model'

@InputType()
export class CreateAtomInput {
  @Field()
  declare name: string

  @Field(() => AtomTypeEnum)
  declare type: AtomTypeEnum
}
