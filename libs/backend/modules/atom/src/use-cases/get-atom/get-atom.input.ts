import { AtomType } from '@codelab/shared/abstract/core'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AtomWhereUniqueInput {
  @Field({ nullable: true })
  declare id?: string

  @Field(() => AtomType, { nullable: true })
  declare type?: AtomType

  @Field({ nullable: true })
  declare element?: string
}

@InputType()
export class GetAtomInput {
  @Field(() => AtomWhereUniqueInput)
  declare where: AtomWhereUniqueInput
}
