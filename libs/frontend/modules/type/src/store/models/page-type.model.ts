import { IPageType, TypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction } from 'mobx-keystone'
import { PageTypeFragment, TypeFragment } from '../../graphql'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'

@model('codelab/PageType')
export class PageType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.PageType),
    props: {},
  }))
  implements IPageType
{
  @modelAction
  updateFromFragment(fragment: TypeFragment): void {
    baseUpdateFromFragment(this, fragment)
  }

  public static fromFragment({
    id,
    typeKind,
    name,
  }: PageTypeFragment): PageType {
    return new PageType({ id, typeKind, name })
  }
}
