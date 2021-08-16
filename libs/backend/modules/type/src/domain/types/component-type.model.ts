import { IComponentTypeVertex, TypeKind } from '@codelab/shared/abstract/core'
import { ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

/**
 * The ComponentType allows selecting a Component in the props form. The value is stored as the componentId
 */
@ObjectType({
  implements: () => [Type],
  description:
    'The ComponentType allows selecting a Component in the props form. The value is stored as the componentId ',
})
export class ComponentType
  implements Type<TypeKind.ComponentType>, IComponentTypeVertex
{
  declare id: string

  declare name: string

  typeKind: TypeKind.ComponentType = TypeKind.ComponentType

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}
