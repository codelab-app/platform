import { Field, InputType } from '@nestjs/graphql'
import { AtomTypeEnum } from '../../infrastructure/atom-type.model'

@InputType()
export class CreateAtomInput {
  @Field()
  declare name: string

  @Field(() => AtomTypeEnum)
  declare type: AtomTypeEnum
}
