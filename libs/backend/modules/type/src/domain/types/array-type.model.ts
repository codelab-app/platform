import { ObjectRef } from '@codelab/backend/abstract/core'
import { IArrayType, TypeKind } from '@codelab/shared/abstract/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

/**
 * The array item type is represented by a TypeEdge of kind ArrayItem
 */
@ObjectType({ implements: () => [Type] })
export class ArrayType extends Type<TypeKind.ArrayType> implements IArrayType {
  @Field(() => ObjectRef)
  itemType: ObjectRef

  constructor({ itemType, ...type }: Omit<IArrayType, 'typeKind'>) {
    super({ typeKind: TypeKind.ArrayType, ...type })
    this.itemType = itemType
  }
}
