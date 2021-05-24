import { AtomType } from '@codelab/modules/atom-type-api'
// import { Prop } from '@codelab/modules/prop-api'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Atom {
  @Field(() => ID)
  declare id: string

  @Field(() => AtomType)
  declare type: AtomType

  // @Field((type) => [Prop], { nullable: true })
  // declare props: [Prop]
}
