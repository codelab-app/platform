import type {
  IResourceDomainService,
  IResourceModel,
} from '@codelab/frontend/abstract/domain'
import { IResourceDto } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { Resource } from '../store'

@model('@codelab/ResourceDomainService')
export class ResourceDomainService
  extends Model({
    resources: prop(() => objectMap<IResourceModel>()),
  })
  implements IResourceDomainService
{
  @computed
  get resourceList() {
    return [...this.resources.values()]
  }

  @modelAction
  hydrate({ config, id, name, type }: IResourceDto) {
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
