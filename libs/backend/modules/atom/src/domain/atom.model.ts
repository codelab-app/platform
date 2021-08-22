import { DgraphInterfaceType } from '@codelab/backend/infra'
import { Tag } from '@codelab/backend/modules/tag'
import { InterfaceType } from '@codelab/backend/modules/type'
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { AtomType, AtomTypeEnum } from './atom-type.model'

registerEnumType(AtomTypeEnum, {
  name: 'AtomType',
})

@ObjectType()
export class Atom {
  @Field(() => ID)
  declare id: string

  @Field(() => AtomTypeEnum)
  declare type: AtomType

  @Field({
    description:
      'This is a unique ID suitable for seeders to lookup, will rename to value',
  })
  declare name: string

  @Field({ description: 'A user friendly display', defaultValue: '' })
  declare label: string

  @Field(() => InterfaceType)
  /**
   *  Keep Dgraph context & resolve in GraphQL resolvers
   */
  declare api?: DgraphInterfaceType

  declare tags?: Array<Tag>

  constructor({ id, type, name, api, label }: Atom) {
    this.id = id
    this.type = type
    this.name = name
    this.api = api
    this.label = label
  }
}
