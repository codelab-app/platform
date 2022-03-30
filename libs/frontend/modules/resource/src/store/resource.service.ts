import { ModalService } from '@codelab/frontend/shared/utils'
import {
  ResourceOptions,
  ResourceWhere,
} from '@codelab/shared/abstract/codegen-v2'
import { computed } from 'mobx'
import {
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  tProp,
  transaction,
  types,
  _async,
  _await,
} from 'mobx-keystone'
import { CreateResourceInput } from '../schema/initialResourceSchema'
import { Resource } from './resource.model'
import { resourceApi } from './resource.api'
import {
  ResourceModalService,
  ResourcesModalService,
} from './resource-modal.service'
import { UpdateResourceInput } from '../use-cases/update-resource/updateResourceSchema'
import { omit } from 'lodash'

export type WithResourceService<T = {}> = T & {
  resourceService: ResourceService
}

@model('codelab/Resource')
export class ResourceService extends Model({
  resourceMap: prop(() => objectMap<Resource>()),
  createModal: prop(() => new ModalService({})),
  updateModal: prop(() => new ResourceModalService({})),
  deleteModal: prop(() => new ResourcesModalService({})),
}) {
  @computed
  get resourceList() {
    return [...this.resourceMap.values()]
  }

  @modelFlow
  @transaction
  getAll = _async(function* (
    this: ResourceService,
    options: ResourceOptions = {},
    where: ResourceWhere = {},
  ) {
    const { resources } = yield* _await(
      resourceApi.GetResources({ where, options }),
    )

    const formattedResources = resources.map((r) => Resource.fromFragment(r))

    formattedResources.forEach((r) => {
      this.resourceMap.set(r.id, r)
    })

    return formattedResources
  })

  @modelFlow
  @transaction
  add = _async(function* (this: ResourceService, input: CreateResourceInput) {
    const {
      createResources: { resources },
    } = yield* _await(
      resourceApi.CreateResources({
        input: {
          name: input.name,
          atom: { connect: { where: { node: { type: input.type } } } },
          data: JSON.stringify(omit(input, ['type', 'name'])),
        },
      }),
    )

    const resource = resources[0]

    if (!resource) {
      throw new Error('Atom was not created')
    }

    const resourceModel = Resource.fromFragment(resource)
    console.log({ resourceModel })

    this.resourceMap.set(resourceModel.id, resourceModel)
    console.log({
      resourceMap: this.resourceMap,
    })

    return resources
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ResourceService,
    resource: Resource,
    input: UpdateResourceInput,
  ) {
    const { updateResources } = yield* _await(
      resourceApi.UpdateResource({
        update: {
          name: input.name,
          atom: {
            disconnect: { where: { node: { type: resource.type } } },
            connect: { where: { node: { type: input.type } } },
          },
          data: JSON.stringify(omit(input, ['type', 'name'])),
        },
        where: { id: resource.id },
      }),
    )

    const updateResource = updateResources.resources[0]

    if (!updateResource) {
      throw new Error('Failed to update resource')
    }

    const resourceModel = Resource.fromFragment(updateResource)

    this.resourceMap.set(resource.id, resourceModel)

    return resourceModel
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ResourceService, resources: Resource[]) {
    const ids = resources.map((resource) => resource.id)

    for (const id of ids) {
      if (this.resourceMap.has(id)) {
        this.resourceMap.delete(id)
      }
    }

    const { deleteResources } = yield* _await(
      resourceApi.DeleteResources({ where: { id_IN: ids } }),
    )

    return deleteResources
  })
}
