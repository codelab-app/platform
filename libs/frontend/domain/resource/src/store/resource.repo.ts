import type { IResourceRepository } from '@codelab/frontend/abstract/domain'
import { IResourceModel } from '@codelab/frontend/abstract/domain'
import { cachedWithTTL, clearCacheForKey } from '@codelab/frontend/shared/utils'
import type { ResourceUniqueWhere } from '@codelab/shared/abstract/codegen'
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
  @clearCacheForKey('resources')
  async add(resource: IResourceModel) {
    const {
      createResources: { resources },
    } = await resourceApi.CreateResources({ input: [resource.toCreateInput()] })

    return resources[0]!
  }

  @clearCacheForKey('resources')
  async delete(resources: Array<IResourceModel>) {
    const {
      deleteResources: { nodesDeleted },
    } = await resourceApi.DeleteResources({
      delete: { config: { where: {} } },
      where: { id_IN: resources.map((resource) => resource.id) },
    })

    return nodesDeleted
  }

  @cachedWithTTL('resources')
  async find(where?: ResourceWhere, options?: ResourceOptions) {
    return await resourceApi.GetResources({ options, where })
  }

  async findOne(where: ResourceUniqueWhere) {
    return (await this.find(where)).items[0]
  }

  // @clearCacheForKey('resources')
  async update(resource: IResourceModel) {
    const {
      updateResources: { resources },
    } = await resourceApi.UpdateResource({
      update: resource.toUpdateInput(),
      where: { id: resource.id },
    })

    return resources[0]!
  }
}
