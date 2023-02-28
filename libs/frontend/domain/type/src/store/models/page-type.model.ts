import type { IPageType } from '@codelab/frontend/abstract/core'
import { IPageTypeDTO, ITypeDTO } from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createBaseType } from './base-type.model'

const hydrate = ({ id, kind, name, owner }: IPageTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.PageType)

  return new PageType({ id, kind, name, owner })
}

@model('@codelab/PageType')
export class PageType
  extends ExtendedModel(createBaseType(ITypeKind.PageType), {})
  implements IPageType
{
  @modelAction
  add(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    return this
  }

  @modelAction
  writeCache(pageTypeDTO: IPageTypeDTO) {
    updateBaseTypeCache(this, pageTypeDTO)

    return this
  }

  public static hydrate = hydrate
}
