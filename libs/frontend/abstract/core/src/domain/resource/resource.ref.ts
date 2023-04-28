import { detach, rootRef } from 'mobx-keystone'
import type { IResource } from './resource.model.interface'

export const resourceRef = rootRef<IResource>('@codelab/ResourceRef', {
  onResolvedValueChange: (ref, newResource, oldResource) => {
    if (oldResource && !newResource) {
      detach(ref)
    }
  },
})
