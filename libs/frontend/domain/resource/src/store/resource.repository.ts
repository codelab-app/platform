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
  find = _async(function* (this: ResourceRepository, where: ResourceWhere) {
    const { resources } = yield* _await(resourceApi.GetResources({ where }))

    return resources
  })

  @modelFlow
  add = _async(function* (this: ResourceRepository, resource: IResource) {
    const {
      createResources: { resources },
    } = yield* _await(
      resourceApi.CreateResources({ input: [resource.toCreateInput()] }),
    )

    return resources[0]!
  })

  @modelFlow
  update = _async(function* (this: ResourceRepository, resource: IResource) {
    const {
      updateResources: { resources },
    } = yield* _await(
      resourceApi.UpdateResource({
        update: resource.toUpdateInput(),
        where: { id: resource.id },
      }),
    )

    return resources[0]!
  })

  @modelFlow
  delete = _async(function* (this: ResourceRepository, ids: Array<string>) {
    const {
      deleteResources: { nodesDeleted },
    } = yield* _await(resourceApi.DeleteResources({ where: { id_IN: ids } }))

    return nodesDeleted
  })
}
