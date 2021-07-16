import { ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

/**
 * The fields of the interface are represented by TypeEdges of kind Field in the TypeGraph
 */
@ObjectType({
  implements: () => [Type],
})
export class InterfaceType implements Type {
  declare id: string

  declare name: string

  // Add a library?

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}
