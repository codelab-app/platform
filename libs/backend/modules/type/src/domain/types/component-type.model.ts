import { IComponentTypeVertex } from '@codelab/shared/core'
import { TypeKind } from '@codelab/shared/enums'
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
  constructor({ id, name }: Pick<ComponentType, 'id' | 'name'>) {
    super(TypeKind.ComponentType)

    this.id = id
    this.name = name
  }
}
