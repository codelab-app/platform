import { Prop } from '@codelab/frontend/modules/element'
import {
  IResource,
  IResourceConfig,
  IResourceDTO,
  ResourceType,
} from '@codelab/shared/abstract/core'
import { detach, idProp, Model, model, prop, rootRef } from 'mobx-keystone'

@model('@codelab/Resource')
export class Resource
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    config: prop<IResourceConfig>(),
    type: prop<ResourceType>(),
  }))
  implements IResource
{
  static hydrate(resource: IResourceDTO) {
    return new Resource({
      id: resource.id,
      name: resource.name,
      type: resource.type,
      config: Prop.hydrate(resource.config) as IResourceConfig,
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
