import {
  IResource,
  IResourceConfig,
  IResourceDTO,
} from '@codelab/frontend/abstract/core'
import { Prop } from '@codelab/frontend/domain/prop'
import { IResourceType } from '@codelab/shared/abstract/core'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'

const hydrate = (resource: IResourceDTO) =>
  new Resource({
    id: resource.id,
    name: resource.name,
    type: resource.type,
    config: Prop.hydrate(resource.config) as IResourceConfig,
    ownerId: resource.owner.id,
  })

@model('@codelab/Resource')
export class Resource
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    config: prop<IResourceConfig>(),
    type: prop<IResourceType>(),
    ownerId: prop<string>(),
  }))
  implements IResource
{
  static hydrate = hydrate

  @modelAction
  writeCache(data: IResourceDTO) {
    this.name = data.name
    this.config.writeCache(data.config)
    this.type = data.type
    this.id = data.id

    return this
  }
}

export const resourceRef = rootRef<IResource>('@codelab/ResourceRef', {
  onResolvedValueChange(ref, newResource, oldResource) {
    if (oldResource && !newResource) {
      detach(ref)
    }
  },
})
