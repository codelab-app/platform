import type { IResourceRepository } from '@codelab/frontend/abstract/core'
import { IResource } from '@codelab/frontend/abstract/core'
import { cachedWithTTL, clearCacheForKey } from '@codelab/frontend/shared/utils'
import {
  ResourceOptions,
  ResourceWhere,
} from '@codelab/shared/abstract/codegen'
import { Model, model } from 'mobx-keystone'
import { resourceApi } from './resource.api'

@model('@codelab/ResourceRepository')
export class ResourceRepository
  extends Model({})
  implements IResourceRepository
{
  @cachedWithTTL('resources')
  async find(where?: ResourceWhere, options?: ResourceOptions) {
    return await resourceApi.GetResources({ options, where })
  }

  @clearCacheForKey('resources')
  async add(resource: IResource) {
    const {
      createResources: { resources },
    } = await resourceApi.CreateResources({ input: [resource.toCreateInput()] })

    return resources[0]!
  }

  @clearCacheForKey('resources')
  async update(resource: IResource) {
    const {
      updateResources: { resources },
    } = await resourceApi.UpdateResource({
      update: resource.toUpdateInput(),
      where: { id: resource.id },
    })

    return resources[0]!
  }

  @clearCacheForKey('resources')
  async delete(resources: Array<IResource>) {
    const {
      deleteResources: { nodesDeleted },
    } = await resourceApi.DeleteResources({
      where: { id_IN: resources.map((resource) => resource.id) },
    })

    return nodesDeleted
  }
}
