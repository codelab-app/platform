import { IReactNodeTypeVertex, TypeKind } from '@codelab/shared/abstract/core'
import { ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

@ObjectType({
  implements: () => [Type],
})
export class ReactNodeType
  extends Type<TypeKind.ReactNodeType>
  implements IReactNodeTypeVertex
{
  constructor({ id, name }: Pick<ReactNodeType, 'id' | 'name'>) {
    super(TypeKind.ReactNodeType)

    this.id = id
    this.name = name
  }
}
