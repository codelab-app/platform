import type { IRenderPropsType } from '@codelab/frontend/abstract/core'
import { IRenderPropsTypeDTO, ITypeDTO } from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
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
  @modelAction
  add(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    return this
  }

  @modelAction
  writeCache(RenderPropsTypeDTO: IRenderPropsTypeDTO) {
    updateBaseTypeCache(this, RenderPropsTypeDTO)

    return this
  }

  public static create = create
}
