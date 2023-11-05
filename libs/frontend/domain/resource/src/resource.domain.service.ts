import type {
  IResourceDomainService,
  IResourceModel,
} from '@codelab/frontend/abstract/domain'
import { IResourceDTO } from '@codelab/shared/abstract/core'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { Resource } from './store'

@model('@codelab/ResourceDomainService')
export class ResourceDomainService
  extends Model({
    resources: prop(() => objectMap<IResourceModel>()),
  })
  implements IResourceDomainService
{
  @modelAction
  hydrate({ config, id, name, type }: IResourceDTO) {
    let resource = this.resources.get(id)

    if (resource) {
      resource.writeCache({ config, name, type })
    } else {
      resource = Resource.create({
        config,
        id,
        name,
        type,
      })
    }

    this.resources.set(resource.id, resource)

    return resource
  }
}
