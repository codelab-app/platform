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
  constructor(type: Omit<RenderPropsType, 'typeKind'>) {
    super({ typeKind: TypeKind.RenderPropsType, ...type })
  }
}
