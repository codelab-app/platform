import { IRenderPropsType, TypeKind } from '@codelab/shared/abstract/core'
import { ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

@ObjectType({
  implements: () => [Type],
})
export class RenderPropsType
  extends Type<TypeKind.RenderPropsType>
  implements IRenderPropsType
{
  constructor({ id, name }: Pick<RenderPropsType, 'id' | 'name'>) {
    super(TypeKind.RenderPropsType)

    this.id = id
    this.name = name
  }
}
