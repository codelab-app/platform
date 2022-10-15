import {
  IResource,
  IResourceConfig,
  IResourceDTO,
} from '@codelab/frontend/abstract/core'
import { Prop } from '@codelab/frontend/domain/prop'
import { tryParse } from '@codelab/frontend/shared/utils'
import { IResourceType } from '@codelab/shared/abstract/core'
import axios from 'axios'
import { GraphQLClient } from 'graphql-request'
import { computed } from 'mobx'
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
  @computed
  get graphqlClient() {
    const { headers, url } = this.config.values
    const options = { headers: tryParse(headers) }

    return new GraphQLClient(url, options)
  }

  @computed
  get restClient() {
    return axios.create({
      baseURL: this.config.values.url,
      headers: tryParse(this.config.values.headers),
    })
  }

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
