import type { IPageTypeModel } from '@codelab/frontend/abstract/domain'
import type { IPageTypeDTO } from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name }: IPageTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.PageType)

  return new PageType({ id, kind, name })
}

@model('@codelab/PageType')
export class PageType
  extends ExtendedModel(createBaseType(ITypeKind.PageType), {})
  implements IPageTypeModel
{
  public static create = create
}
