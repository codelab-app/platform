import { AtomType } from '@codelab/modules/atom-type-api'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Atom {
  @Field(() => ID)
  declare id: string

  @Field(() => AtomType)
  declare type: AtomType

  // library: Library! need to add library when we implement it

  @Field()
  declare label: string

  constructor(id: string, type: AtomType, label: string) {
    this.id = id
    this.type = type
    this.label = label
  }
}
