import type {
  IRenderPropsType,
  IRenderPropsTypeDTO,
} from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name, owner }: IRenderPropsTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.RenderPropsType)

  return new RenderPropsType({
    id,
    kind,
    name,
    owner,
  })
}

@model('@codelab/RenderPropsType')
export class RenderPropsType
  extends ExtendedModel(createBaseType(ITypeKind.RenderPropsType), {})
  implements IRenderPropsType
{
  public static create = create
}
