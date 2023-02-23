import type {
  IAuth0Owner,
  IResource,
  IResourceConfig,
} from '@codelab/frontend/abstract/core'
import { IResourceDTO } from '@codelab/frontend/abstract/core'
import { Prop } from '@codelab/frontend/domain/prop'
import type { IResourceType } from '@codelab/shared/abstract/core'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'

const hydrate = ({ id, name, type, config, owner }: IResourceDTO) =>
  new Resource({
    id,
    name,
    type,
    config: Prop.hydrate(config) as IResourceConfig,
    owner,
  })

@model('@codelab/Resource')
export class Resource
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    config: prop<IResourceConfig>(),
    type: prop<IResourceType>(),
    owner: prop<IAuth0Owner>(),
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
  onResolvedValueChange: (ref, newResource, oldResource) => {
    if (oldResource && !newResource) {
      detach(ref)
    }
  },
})
