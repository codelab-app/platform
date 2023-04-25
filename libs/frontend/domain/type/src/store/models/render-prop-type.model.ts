import type {
  IRenderPropType,
  IRenderPropTypeDTO,
} from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name, owner }: IRenderPropTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.RenderPropType)

  return new RenderPropType({
    id,
    kind,
    name,
    owner,
  })
}

@model('@codelab/RenderPropType')
export class RenderPropType
  extends ExtendedModel(createBaseType(ITypeKind.RenderPropType), {})
  implements IRenderPropType
{
  public static create = create
}
