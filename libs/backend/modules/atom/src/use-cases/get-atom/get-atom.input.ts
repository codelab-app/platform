import { Field, InputType } from '@nestjs/graphql'
import { AtomTypeEnum } from '../../domain/atom-type.model'

@InputType()
export class AtomWhereUniqueInput {
  @Field({ nullable: true })
  declare id?: string

  @Field(() => AtomTypeEnum, { nullable: true })
  declare type?: AtomTypeEnum

  @Field({ nullable: true })
  declare element?: string
}

@InputType()
export class GetAtomInput {
  @Field(() => AtomWhereUniqueInput)
  declare where: AtomWhereUniqueInput
}
