import type {
  ICreateResourceDTO,
  IResource,
  IResourceService,
  IUpdateResourceDTO,
} from '@codelab/frontend/abstract/core'
import { IResourceDTO } from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type {
  ResourceCreateInput,
  ResourceWhere,
} from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
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
import { v4 } from 'uuid'
import { resourceApi } from './resource.api'
import { Resource } from './resource.model'
import { ResourceModalService } from './resource-modal.service'

@model('@codelab/Resource')
export class ResourceService
  extends Model({
    resources: prop(() => objectMap<IResource>()),

    // createModal: prop(() => new CreateResourceModalService({})),
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

  @modelFlow
  @transaction
  getAll = _async(function* (this: ResourceService, where: ResourceWhere = {}) {
    const { resources } = yield* _await(resourceApi.GetResources({ where }))

    return resources.map((resource) => this.writeCache(resource))
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
      id: v4(),
      type: resource.type,
      name: resource.name,
      config: {
        create: {
          node: {
            data: JSON.stringify(resource.config),
          },
        },
      },
      owner: connectAuth0Owner(resource.owner.auth0Id),
    }))

    const {
      createResources: { resources },
    } = yield* _await(
      resourceApi.CreateResources({
        input,
      }),
    )

    return resources.map((resource) => this.writeCache(resource))
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ResourceService,
    { id, config, name, type }: IUpdateResourceDTO,
  ) {
    const {
      updateResources: { resources },
    } = yield* _await(
      resourceApi.UpdateResource({
        update: {
          name,
          type,
          config: {
            update: { node: { data: JSON.stringify(config) } },
            where: {},
          },
        },
        where: { id },
      }),
    )

    return resources.map((resource) => this.writeCache(resource))
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ResourceService, ids: Array<string>) {
    ids.forEach((id) => this.resources.delete(id))

    const {
      deleteResources: { nodesDeleted },
    } = yield* _await(resourceApi.DeleteResources({ where: { id_IN: ids } }))

    return nodesDeleted
  })

  @modelAction
  load(resources: Array<IResourceDTO>) {
    resources.forEach((resource) => this.writeCache(resource))
  }

  @modelAction
  writeCache(resource: IResourceDTO) {
    let resourceModel = this.resource(resource.id)

    if (resourceModel) {
      resourceModel.writeCache(resource)
    } else {
      resourceModel = Resource.hydrate(resource)
      this.resources.set(resourceModel.id, resourceModel)
    }

    return resourceModel
  }
}

export const resourceServiceContext = createContext<IResourceService>()

export const getResourceService = (self: object) => {
  const resourceService = resourceServiceContext.get(self)

  if (!resourceService) {
    throw new Error('ResourceService context is not defined')
  }

  return resourceService
}
