import type {
  IResource,
  IResourceRepository,
} from '@codelab/frontend/abstract/core'
import { cachedWithTTL, clearCacheForKey } from '@codelab/frontend/shared/utils'
import type {
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
  // @cachedWithTTL('resources')
  find = async (where?: ResourceWhere, options?: ResourceOptions) => {
    return await resourceApi.GetResources({ options, where })
  }

  // @clearCacheForKey('resources')
  add = async (resource: IResource) => {
    const {
      createResources: { resources },
    } = await resourceApi.CreateResources({ input: [resource.toCreateInput()] })

    return resources[0]!
  }

  // @clearCacheForKey('resources')
  update = async (resource: IResource) => {
    const {
      updateResources: { resources },
    } = await resourceApi.UpdateResource({
      update: resource.toUpdateInput(),
      where: { id: resource.id },
    })

    return resources[0]!
  }

  // @clearCacheForKey('resources')
  delete = async (resources: Array<IResource>) => {
    const {
      deleteResources: { nodesDeleted },
    } = await resourceApi.DeleteResources({
      where: { id_IN: resources.map((resource) => resource.id) },
    })

    return nodesDeleted
  }
}
