import type { DgraphInterfaceType } from '@codelab/backend/infra'
import { Tag } from '@codelab/backend/modules/tag'
import { InterfaceType } from '@codelab/backend/modules/type'
import { AtomType } from '@codelab/shared/enums'
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'

registerEnumType(AtomType, {
  name: 'AtomType',
})

@ObjectType()
export class Atom {
  @Field(() => ID)
  declare id: string

  @Field(() => AtomType)
  declare type: AtomType

  @Field({
    description:
      'This is a unique ID suitable for seeders to lookup, will rename to value',
  })
  declare name: string

  @Field(() => InterfaceType)
  /**
   *  Keep Dgraph context & resolve in GraphQL resolvers
   */
  declare api?: DgraphInterfaceType

  declare tags?: Array<Tag>

  constructor({ id, type, name, api }: Atom) {
    this.id = id
    this.type = type
    this.name = name
    this.api = api
  }

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
