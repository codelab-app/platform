import type {
  IResource,
  IResourceRepository,
} from '@codelab/frontend/abstract/core'
import type {
  ResourceOptions,
  ResourceWhere,
} from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { resourceApi } from './resource.api'

@model('@codelab/ResourceRepository')
export class ResourceRepository
  extends Model({})
  implements IResourceRepository
{
  @modelFlow
  find = _async(function* (
    this: ResourceRepository,
    where?: ResourceWhere,
    options?: ResourceOptions,
  ) {
    return yield* _await(resourceApi.GetResources({ options, where }))
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
  delete = _async(function* (
    this: ResourceRepository,
    resources: Array<IResource>,
  ) {
    const {
      deleteResources: { nodesDeleted },
    } = yield* _await(
      resourceApi.DeleteResources({
        where: { id_IN: resources.map((resource) => resource.id) },
      }),
    )

    return nodesDeleted
  })
}
