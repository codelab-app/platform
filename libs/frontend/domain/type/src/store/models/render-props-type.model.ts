import type {
  IRenderPropsType,
  IRenderPropsTypeDTO,
  ITypeDTO,
} from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/frontend/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'

const hydrate = ({ id, kind, name, owner }: IRenderPropsTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.RenderPropsType)

  return new RenderPropsType({
    id,
    kind,
    name,
    ownerId: owner?.id,
  })
}

@model('@codelab/RenderPropsType')
export class RenderPropsType
  extends ExtendedModel(createTypeBase(ITypeKind.RenderPropsType), {})
  implements IRenderPropsType
{
  @modelAction
  writeCache(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    return this
  }

  public static hydrate = hydrate
}
