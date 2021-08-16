import { IArrayTypeVertex, TypeKind } from '@codelab/shared/abstract/core'
import { ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

/**
 * The array item type is represented by a TypeEdge of kind ArrayItem
 */
@ObjectType({ implements: () => [Type] })
export class ArrayType implements Type<TypeKind.ArrayType>, IArrayTypeVertex {
  declare id: string

  declare name: string

  typeKind: TypeKind.ArrayType = TypeKind.ArrayType

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}
