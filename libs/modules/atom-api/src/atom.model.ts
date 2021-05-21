import { AtomType } from '@codelab/modules/atom-type-api'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Atom {
  @Field(() => ID)
  declare id: string

  @Field(() => AtomType)
  declare type: AtomType

  // @Field((type)=>[Prop])
  // declare props: [Prop]
}
