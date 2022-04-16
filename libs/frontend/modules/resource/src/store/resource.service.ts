import { ModalService } from '@codelab/frontend/shared/utils'
import { ResourceWhere } from '@codelab/shared/abstract/codegen'
import {
  ICreateResourceDTO,
  IUpdateResourceDTO,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { resourceApi } from './resource.api'
import { Resource } from './resource.model'
import { ResourceModalService } from './resource-modal.service'

export type WithResourceService = {
  resourceService: ResourceService
}

@model('codelab/Resource')
export class ResourceService extends Model({
  resources: prop(() => objectMap<Resource>()),

  createModal: prop(() => new ModalService({})),
  updateModal: prop(() => new ResourceModalService({})),
  deleteModal: prop(() => new ResourceModalService({})),
}) {
  @computed
  get resourceList() {
    return [...this.resources.values()]
  }

  resource(id: string) {
    return this.resources.get(id)
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: ResourceService, where: ResourceWhere = {}) {
    const { resources } = yield* _await(resourceApi.GetResources({ where }))

    resources.forEach((r) => {
      this.resources.set(r.id, Resource.fromFragment(r))
    })

    return this.resources
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: ResourceService, id: string) {
    const [resource] = yield* _await(this.getAll({ id }))

    return resource
  })

  @modelFlow
  @transaction
  createResource = _async(function* (
    this: ResourceService,
    input: ICreateResourceDTO,
  ) {
    const { name, type, config } = input

    const { createResources } = yield* _await(
      resourceApi.CreateResources({
        input: { type, name, config: JSON.stringify(config) },
      }),
    )

    const resource = createResources.resources[0]

    if (!resource) {
      throw new Error('Atom was not created')
    }

    const resourceModel = Resource.fromFragment(resource)

    this.resources.set(resourceModel.id, resourceModel)

    return resource
  })

  @modelFlow
  @transaction
  updateResource = _async(function* (
    this: ResourceService,
    resource: Resource,
    input: IUpdateResourceDTO,
  ) {
    const { config, name, type } = input

    const { updateResources } = yield* _await(
      resourceApi.UpdateResource({
        update: {
          name,
          type,
          config: JSON.stringify(config),
        },
        where: { id: resource.id },
      }),
    )

    const updateResource = updateResources.resources[0]

    if (!updateResource) {
      throw new Error('Failed to update resource')
    }

    const resourceModel = Resource.fromFragment(updateResource)

    this.resources.set(resource.id, resourceModel)

    return resourceModel
  })

  @modelFlow
  @transaction
  deleteResource = _async(function* (this: ResourceService, id: string) {
    this.resources.delete(id)

    const { deleteResources } = yield* _await(
      resourceApi.DeleteResources({ where: { id } }),
    )

    return deleteResources
  })
}
