import {
  IPageType,
  IPageTypeDTO,
  ITypeDTO,
  IUpdateTypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { updateFromDTO } from '../abstract'
import { createTypeBase } from './base-type.model'

const hydrate = ({ id, typeKind, name, owner }: IPageTypeDTO): PageType =>
  new PageType({ id, typeKind, name, ownerAuth0Id: owner?.auth0Id })

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
    updateFromDTO(this, fragment)
  }

  @modelAction
  override applyUpdateData(input: IUpdateTypeDTO) {
    super.applyUpdateData(input)
  }

  public static hydrate = hydrate
}
