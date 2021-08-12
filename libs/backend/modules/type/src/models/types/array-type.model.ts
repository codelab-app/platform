import { ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

/**
 * The array item type is represented by a TypeEdge of kind ArrayItem
 */
@ObjectType({ implements: () => [Type] })
export class ArrayType implements Type {
  declare id: string

  declare name: string

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}
