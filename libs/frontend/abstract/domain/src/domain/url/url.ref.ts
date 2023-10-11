import type { Ref } from 'mobx-keystone'
import { detach, isRefOfType, rootRef } from 'mobx-keystone'
import type { IUrlModel } from './url.model.interface'

export const urlRef = rootRef<IUrlModel>('@codelab/UrlRef', {
  onResolvedValueChange: (ref, newUrl, oldUrl) => {
    if (oldUrl && !newUrl) {
      detach(ref)
    }
  },
})

export const isUrlRef = (ref: Ref<object>): ref is Ref<IUrlModel> =>
  isRefOfType(ref, urlRef)
