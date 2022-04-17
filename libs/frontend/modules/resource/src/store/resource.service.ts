import { ModalService } from '@codelab/frontend/shared/utils'
import { ResourceWhere } from '@codelab/shared/abstract/codegen'
import {
  ICreateResourceDTO,
  IResourceDTO,
  IUpdateResourceDTO,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  createContext,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { getOperationService } from './operation.service'
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

  @modelAction
  fetchOperations(operations: IResourceDTO['operations']) {
    getOperationService(this).updateCache(operations)
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: ResourceService, where: ResourceWhere = {}) {
    const { resources } = yield* _await(resourceApi.GetResources({ where }))

    this.fetchOperations(resources.flatMap((x) => x.operations))

    resources.forEach((r) => {
      this.resources.set(r.id, Resource.hydrate(r))
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

    const resourceModel = Resource.hydrate(resource)

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

    const resourceModel = Resource.hydrate(updateResource)

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

  @modelAction
  updateCache(resources: Array<IResourceDTO>) {
    for (const resource of resources) {
      this.addOrUpdate(resource)
      // when loading the store we load operations inside resources too
      getOperationService(this).updateCache(resource.operations)
    }
  }

  @modelAction
  addOrUpdate(resource: IResourceDTO) {
    const existing = this.resource(resource.id)

    if (existing) {
      existing.name = resource.name
      existing.config = JSON.parse(resource.config)
      existing.type = resource.type
    } else {
      this.addResource(Resource.hydrate(resource))
    }
  }

  @modelAction
  addResource(resource: Resource) {
    this.resources.set(resource.id, resource)
  }
}

export const resourceServiceContext = createContext<ResourceService>()

export const getResourceService = (self: object) => {
  const resourceStore = resourceServiceContext.get(self)

  if (!resourceStore) {
    throw new Error('ResourceService context is not defined')
  }

  return resourceStore
}
