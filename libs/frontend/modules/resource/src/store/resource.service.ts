import { ModalService } from '@codelab/frontend/shared/utils'
import { ResourceOptions, ResourceWhere } from '@codelab/shared/abstract/codegen-v2'
import { computed } from 'mobx'
import { Model, model, modelAction, modelFlow, objectMap, prop, tProp, transaction, types, _async, _await } from 'mobx-keystone'
import { CreateResourceInput } from '../use-cases/create-resource/createResourceSchema'
import { Resource } from './resource.model'
import { resourceApi } from './resource.api'

export type WithResourceService = {
  resourceService: ResourceService
}

@model('codelab/Resource')
export class ResourceService extends Model({
  resourceMap: prop(() => objectMap<Resource>()),
  createModal: prop(() => new ModalService({})),
}) {
  @computed
  get resourceList() {
    return [...this.resourceMap.values()]
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: ResourceService, options: ResourceOptions = {}, where: ResourceWhere = {}) {
    const { resources } = yield* _await(resourceApi.GetResources({ where, options }))

    const formattedResources = resources.map(r => Resource.fromFragment(r))

    formattedResources.forEach(r => {
      this.resourceMap.set(r.id, r)
    })

    return formattedResources
  })

  @modelFlow
  @transaction
  add = _async(function* (this: ResourceService, input: CreateResourceInput) {
    const { createResources: {
      resources
    } } = yield* _await(resourceApi.CreateResources({
      input: {
        name: input.name,
        atom: { connect: { where: { node: { type: input.type } } } }
      },
    }))

    const resource = resources[0]

    if (!resource) {
      throw new Error('Atom was not created')
    }

    const resourceModel = Resource.fromFragment(resource)
    console.log({ resourceModel });


    this.resourceMap.set(resourceModel.id, resourceModel)
    console.log({
      resourceMap: this.resourceMap
    });


    return resources
  })

  @modelAction
  remove(resource: Resource) {
    resourceApi.DeleteResources()
  }
}
