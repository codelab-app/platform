import { detach, rootRef } from 'mobx-keystone'
import type { IResourceModel } from './resource.model.interface'

export const resourceRef = rootRef<IResourceModel>('@codelab/ResourceRef', {
  onResolvedValueChange: (ref, newResource, oldResource) => {
    if (oldResource && !newResource) {
      detach(ref)
    }
  },
})
