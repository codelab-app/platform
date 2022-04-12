import { getTypeService } from '@codelab/frontend/modules/type'
import { ModalService } from '@codelab/frontend/shared/utils'
import { ResourceWhere } from '@codelab/shared/abstract/codegen'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { ResourceFragment } from '../graphql/resource.fragment.graphql.gen'
import { CreateResourceInput, UpdateResourceInput } from '../use-cases'
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
  async fetchApis(api: Array<ResourceFragment['api']>) {
    // loading api interface within resource fragment is hard so we load it separately
    return await getTypeService(this).getAll(api.map((x) => x.id))
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: ResourceService, where: ResourceWhere = {}) {
    const { resources } = yield* _await(resourceApi.GetResources({ where }))
    const apis = resources.map((x) => x.api)

    yield* _await(this.fetchApis(apis))

    const formattedResources = resources.map((r) => Resource.fromFragment(r))

    formattedResources.forEach((r) => {
      this.resources.set(r.id, r)
    })

    return formattedResources
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
    input: CreateResourceInput,
  ) {
    const {
      createResources: { resources },
    } = yield* _await(
      resourceApi.CreateResources({
        input: {
          name: input.name,
          api: { connect: { where: { node: { id: input.apiId } } } },
        },
      }),
    )

    const resource = resources[0]

    if (!resource) {
      throw new Error('Atom was not created')
    }

    const resourceModel = Resource.fromFragment(resource)

    this.resources.set(resourceModel.id, resourceModel)

    return resources
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ResourceService,
    resource: Resource,
    input: UpdateResourceInput,
  ) {
    const { apiId, name, data } = input

    const { updateResources } = yield* _await(
      resourceApi.UpdateResource({
        update: {
          name,
          api: { connect: { where: { node: { id: apiId } } } },
          data: data,
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
  delete = _async(function* (this: ResourceService, id: string) {
    this.resources.delete(id)

    const { deleteResources } = yield* _await(
      resourceApi.DeleteResources({ where: { id } }),
    )

    return deleteResources
  })
}
