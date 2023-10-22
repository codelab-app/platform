import type { Ref } from 'mobx-keystone'
import { detach, isRefOfType, rootRef } from 'mobx-keystone'
import type { IComponentModel } from '../component'
import type { IElementModel } from '../element'
import type { IPageModel } from './page.model.interface'

export type IPageNodeRef = Ref<IComponentModel> | Ref<IElementModel>

export type IPageNode = IComponentModel | IElementModel

export const pageRef = rootRef<IPageModel>('@codelab/PageRef', {
  onResolvedValueChange: (ref, newPage, oldPage) => {
    if (oldPage && !newPage) {
      detach(ref)
    }
  },
})

export const isPageRef = (ref: Ref<object>): ref is Ref<IPageModel> =>
  isRefOfType(ref, pageRef)
