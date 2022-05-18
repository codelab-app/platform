import {
  assertIsTypeKind,
  IRenderPropsType,
  IRenderPropsTypeDTO,
  ITypeDTO,
  ITypeKind,
} from '@codelab/shared/abstract/core'
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
  updateCache(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)
  }

  // @modelAction
  // override applyUpdateData(input: IUpdateTypeDTO) {
  //   super.applyUpdateData(input)
  // }

  public static hydrate = hydrate
}
