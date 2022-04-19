import {
  assertIsTypeKind,
  IPageType,
  IPageTypeDTO,
  ITypeDTO,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'

const hydrate = ({ id, kind, name, owner }: IPageTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.PageType)

  return new PageType({ id, kind, name, ownerId: owner?.id })
}

@model('@codelab/PageType')
export class PageType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(ITypeKind.PageType),
    props: {},
  }))
  implements IPageType
{
  @modelAction
  updateCache(fragment: ITypeDTO): void {
    updateBaseTypeCache(this, fragment)
  }

  // @modelAction
  // override applyUpdateData(input: IUpdateTypeDTO) {
  //   super.applyUpdateData(input)
  // }

  public static hydrate = hydrate
}
