import isNil from 'lodash/isNil'
import type { AnyModel, Ref } from 'mobx-keystone'
import { detach, isRefOfType, modelTypeKey, rootRef } from 'mobx-keystone'
import { componentRef, type IComponentModel } from '../component'
import type { IElementModel } from '../element'
import { elementRef } from '../element'
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
