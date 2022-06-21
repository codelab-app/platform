import { Prop } from '@codelab/frontend/modules/element'
import {
  IResource,
  IResourceConfig,
  IResourceDTO,
  ResourceType,
} from '@codelab/shared/abstract/core'
import axios from 'axios'
import { GraphQLClient } from 'graphql-request'
import { computed } from 'mobx'
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
  @computed
  get graphqlClient() {
    const { headers, url } = this.config.values
    const options = { headers: JSON.parse(headers || '{}') }

    return new GraphQLClient(url, options)
  }

  @computed
  get restClient() {
    return axios.create({
      baseURL: this.config.values.url,
      headers: JSON.parse(this.config.values.headers || '{}'),
    })
  }

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
