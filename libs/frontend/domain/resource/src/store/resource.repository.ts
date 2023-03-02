import type {
  IResource,
  IResourceRepository,
} from '@codelab/frontend/abstract/core'
import type { ResourceWhere } from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { resourceApi } from './resource.api'

@model('@codelab/ResourceRepository')
export class ResourceRepository
  extends Model({})
  implements IResourceRepository
{
  @modelFlow
  get = _async(function* (this: ResourceRepository, where: ResourceWhere) {
    const response = yield* _await(resourceApi.GetResources({ where }))

    return response.resources
  })

  @modelFlow
  create = _async(function* (this: ResourceRepository, resource: IResource) {
    const response = yield* _await(
      resourceApi.CreateResources({ input: [resource.toCreateInput()] }),
    )

    return response.createResources.resources[0]!
  })

  @modelFlow
  update = _async(function* (this: ResourceRepository, resource: IResource) {
    const response = yield* _await(
      resourceApi.UpdateResource({
        update: resource.toUpdateInput(),
        where: { id: resource.id },
      }),
    )

    return response.updateResources.resources[0]!
  })

  @modelFlow
  delete = _async(function* (this: ResourceRepository, id: string) {
    const response = yield* _await(
      resourceApi.DeleteResources({ where: { id } }),
    )

    return response.deleteResources.nodesDeleted
  })
}
