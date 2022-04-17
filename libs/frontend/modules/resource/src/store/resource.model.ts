import { ResourceType } from '@codelab/shared/abstract/codegen'
import { IPropData, IResourceDTO } from '@codelab/shared/abstract/core'
import { detach, idProp, Model, model, prop, rootRef } from 'mobx-keystone'

@model('codelab/Resource')
export class Resource extends Model(() => ({
  id: idProp,
  name: prop<string>(),
  config: prop<IPropData>(),
  type: prop<ResourceType>(),
})) {
  static hydrate(resource: IResourceDTO) {
    return new Resource({
      id: resource.id,
      name: resource.name,
      type: resource.type,
      config: JSON.parse(resource.config),
    })
  }
}

export const resourceRef = rootRef<Resource>('ResourceRef', {
  onResolvedValueChange(ref, newResource, oldResource) {
    if (oldResource && !newResource) {
      detach(ref)
    }
  },
})
