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
  extends Type<TypeKind.ComponentType>
  implements IComponentTypeVertex
{
  constructor({ id, name, tags }: Pick<ComponentType, 'id' | 'name' | 'tags'>) {
    super(TypeKind.ComponentType)

    this.tags = tags
    this.id = id
    this.name = name
  }
}
