import { IArrayTypeVertex, TypeKind } from '@codelab/shared/abstract/core'
import { ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

/**
 * The array item type is represented by a TypeEdge of kind ArrayItem
 */
@ObjectType({ implements: () => [Type] })
export class ArrayType
  extends Type<TypeKind.ArrayType>
  implements IArrayTypeVertex
{
  constructor({ id, name, tags }: Pick<ArrayType, 'id' | 'name' | 'tags'>) {
    super(TypeKind.ArrayType)

    this.tags = tags
    this.id = id
    this.name = name
  }
}
