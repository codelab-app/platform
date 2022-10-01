import type {
  IPageType,
  IPageTypeDTO,
  ITypeDTO,
} from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'

const hydrate = ({ id, kind, name, owner }: IPageTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.PageType)

  return new PageType({ id, kind, name, ownerId: owner?.id })
}

@model('@codelab/PageType')
export class PageType
  extends ExtendedModel(createTypeBase(ITypeKind.PageType), {})
  implements IPageType
{
  @modelAction
  writeCache(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    return this
  }

  public static hydrate = hydrate
}
