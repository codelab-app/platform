import {
  ResourceCreateInput,
  ResourceWhere,
} from '@codelab/shared/abstract/codegen'
import {
  ICreateResourceDTO,
  IResourceDTO,
  IResourceService,
  IUpdateResourceDTO,
} from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/data'
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
import { resourceApi } from './resource.api'
import { Resource } from './resource.model'
import {
  CreateResourceModalService,
  ResourceModalService,
} from './resource-modal.service'

@model('@codelab/Resource')
export class ResourceService
  extends Model({
    resources: prop(() => objectMap<Resource>()),

    createModal: prop(() => new CreateResourceModalService({})),
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

  @modelFlow
  @transaction
  getAll = _async(function* (this: ResourceService, where: ResourceWhere = {}) {
    const { resources } = yield* _await(resourceApi.GetResources({ where }))

    return resources.map((resource) => {
      if (this.resources.has(resource.id)) {
        return this.resources.get(resource.id)!
      }

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
    const input: Array<ResourceCreateInput> = data.map((resource) => ({
      type: resource.type,
      name: resource.name,
      config: {
        create: {
          node: {
            data: JSON.stringify(resource.config),
          },
        },
      },
      owner: connectOwner(resource.auth0Id),
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
          config: {
            update: { node: { data: JSON.stringify(config) } },
            where: {},
          },
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
    return resources.map((r) => this.addOrUpdate(r))
  }

  @modelAction
  addOrUpdate(resource: IResourceDTO) {
    let resourceModel = this.resource(resource.id)

    if (resourceModel) {
      resourceModel.name = resource.name
      resourceModel.config.updateCache(resource.config)
      resourceModel.type = resource.type
    } else {
      resourceModel = Resource.hydrate(resource)
    }

    return resourceModel
  }
}

export const resourceServiceContext = createContext<IResourceService>()

export const getResourceService = (self: object) => {
  const resourceStore = resourceServiceContext.get(self)

  if (!resourceStore) {
    throw new Error('ResourceService context is not defined')
  }

  return resourceStore
}
