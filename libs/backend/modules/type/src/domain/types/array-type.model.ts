import { IArrayType, TypeKind } from '@codelab/shared/abstract/core'
import { ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

/**
 * The array item type is represented by a TypeEdge of kind ArrayItem
 */
@ObjectType({ implements: () => [Type] })
export class ArrayType extends Type<TypeKind.ArrayType> implements IArrayType {
  constructor({ id, name }: IArrayType) {
    super(TypeKind.ArrayType)

    this.id = id
    this.name = name
  }
}
