import { ModalService } from '@codelab/frontend/shared/utils'
import { ResourceWhere } from '@codelab/shared/abstract/codegen'
import {
  ICreateResourceDTO,
  IResourceDTO,
  IResourceService,
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

@model('@codelab/Resource')
export class ResourceService
  extends Model({
    resources: prop(() => objectMap<Resource>()),

    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new ResourceModalService({})),
    deleteModal: prop(() => new ResourceModalService({})),
  })
  implements IResourceService
{
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

    return resources.map((resource) => {
      const resourceModel = Resource.hydrate(resource)
      this.resources.set(resource.id, resourceModel)

      return resourceModel
    })
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: ResourceService, id: string) {
    const [resource] = yield* _await(this.getAll({ id }))

    return resource
  })

  @modelFlow
  @transaction
  create = _async(function* (
    this: ResourceService,
    data: Array<ICreateResourceDTO>,
  ) {
    const input = data.map((resource) => ({
      type: resource.type,
      name: resource.name,
      config: JSON.stringify(resource.config),
    }))

    const {
      createResources: { resources },
    } = yield* _await(
      resourceApi.CreateResources({
        input,
      }),
    )

    if (!resources.length) {
      throw new Error('Resource was not created')
    }

    return resources.map((resource) => {
      const resourceModel = Resource.hydrate(resource)

      this.resources.set(resourceModel.id, resourceModel)

      return resourceModel
    })
  })

  @modelFlow
  @transaction
  update = _async(function* (
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
