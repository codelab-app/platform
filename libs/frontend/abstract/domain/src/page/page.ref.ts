import type { AnyModel, Ref } from 'mobx-keystone'

import { detach, rootRef } from 'mobx-keystone'

import type { IElementModel } from '../element'
import type { IPageModel } from './page.model.interface'

import { type IComponentModel } from '../component'

export type IPageNodeRef = Ref<IComponentModel> | Ref<IElementModel>

export type IPageNode = IComponentModel | IElementModel

export const pageRef = rootRef<IPageModel>('@codelab/PageRef', {
  onResolvedValueChange: (ref, newPage, oldPage) => {
    if (oldPage && !newPage) {
      detach(ref)
    }
  },
})

export const isPage = (instance: AnyModel): instance is IPageModel => {
  return instance.$modelType === '@codelab/Page'
}
