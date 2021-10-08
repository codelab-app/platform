import { IInterfaceType, TypeKind } from '@codelab/shared/abstract/core'
import { ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

/**
 * The fields of the interface are represented by TypeEdges of kind Field in the TypeGraph
 */
@ObjectType({
  implements: () => [Type],
})
export class InterfaceType
  extends Type<TypeKind.InterfaceType>
  implements IInterfaceType
{
  constructor({ id, name }: Pick<InterfaceType, 'id' | 'name'>) {
    super(TypeKind.InterfaceType)

    this.id = id
    this.name = name
  }
}
