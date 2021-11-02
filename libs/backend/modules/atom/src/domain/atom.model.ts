import { Tag } from '@codelab/backend/modules/tag'
import { InterfaceType } from '@codelab/backend/modules/type'
import { AtomType, IAtom } from '@codelab/shared/abstract/core'
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'

registerEnumType(AtomType, {
  name: 'AtomType',
})

@ObjectType()
export class Atom implements IAtom {
  @Field(() => ID)
  declare id: string

  @Field(() => AtomType)
  declare type: AtomType

  @Field({
    description: 'This is a unique ID suitable for seeders to lookup',
  })
  declare name: string

  @Field(() => InterfaceType)
  declare api: InterfaceType

  declare tags?: Array<Tag>

  /**
   * The same export format should also act as input for seeding
   */
  // static seedAtoms(atoms: Array<AtomExportFragment>) {
  // atoms?.forEach((atom) => {
  //   this.seedAtom(atom)
  // })
  // }

  // private seedAtom(atom: AtomExportFragment) {}
}
