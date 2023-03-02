import type { IResource } from '@codelab/frontend/abstract/core'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { resourceApi } from '../store'

@model('@codelab/ResourceRepository')
export class ResourceRepository extends Model({}) {
  @modelFlow
  add = _async(function* (this: ResourceRepository, resource: IResource) {
    yield* _await(
      resourceApi.CreateResources({ input: [resource.toCreateInput()] }),
    )
  })

  @modelFlow
  update = _async(function* (this: ResourceRepository, resource: IResource) {
    yield* _await(
      resourceApi.UpdateResource({
        update: resource.toUpdateInput(),
        where: { id: resource.id },
      }),
    )
  })

  @modelFlow
  delete = _async(function* (this: ResourceRepository, id: string) {
    yield* _await(resourceApi.DeleteResources({ where: { id } }))
  })
}
