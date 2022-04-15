import {
  IPageType,
  IPageTypeDTO,
  ITypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'

const hydrate = ({ id, typeKind, name, owner }: IPageTypeDTO): PageType =>
  new PageType({ id, typeKind, name, ownerId: owner?.id })

@model('@codelab/PageType')
export class PageType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.PageType),
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
