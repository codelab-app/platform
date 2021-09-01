import { IArrayTypeVertex } from '@codelab/shared/core'
import { TypeKind } from '@codelab/shared/enums'
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
  constructor({ id, name }: Pick<ArrayType, 'id' | 'name'>) {
    super(TypeKind.ArrayType)

    this.id = id
    this.name = name
  }
}
