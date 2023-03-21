import type {
  ICreateResourceData,
  IResource,
  IResourceService,
  IUpdateResourceData,
} from '@codelab/frontend/abstract/core'
import { IResourceDTO } from '@codelab/frontend/abstract/core'
import { getPropService } from '@codelab/frontend/domain/prop'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { ResourceWhere } from '@codelab/shared/abstract/codegen'
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
import { v4 } from 'uuid'
import { Resource } from './resource.model'
import { ResourceRepository } from './resource.repo'
import { ResourceModalService } from './resource-modal.service'

@model('@codelab/ResourceService')
export class ResourceService
  extends Model({
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new ResourceModalService({})),
    resourceRepository: prop(() => new ResourceRepository({})),
    resources: prop(() => objectMap<IResource>()),
    updateModal: prop(() => new ResourceModalService({})),
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

  @computed
  private get propService() {
    return getPropService(this)
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: ResourceService, where: ResourceWhere = {}) {
    const resources = yield* _await(this.resourceRepository.find(where))

    return resources.map((resource) => {
      /**
       * attach resource config to mobx tree before calling propRef
       */
      this.propService.add(resource.config)

      return this.add(resource)
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
    { config: configData, id, name, owner, type }: ICreateResourceData,
  ) {
    const config = this.propService.add({
      data: JSON.stringify(configData),
      id: v4(),
    })

    const resource = this.add({
      config,
      id,
      name,
      owner,
      type,
    })

    yield* _await(this.resourceRepository.add(resource))

    return resource
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ResourceService,
    { config: configData, id, name, type }: IUpdateResourceData,
  ) {
    const resource = this.resources.get(id)!
    const config = resource.config.current

    /**
     * Write cache for inner model config of type Prop
     */
    config.writeCache({ data: JSON.stringify(configData) })
    resource.writeCache({ name, type })

    yield* _await(this.resourceRepository.update(resource))

    return resource
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ResourceService, resource: IResource) {
    const { id } = resource

    this.resources.delete(id)

    yield* _await(this.resourceRepository.delete([resource]))

    return resource
  })

  @modelAction
  load(resources: Array<IResourceDTO>) {
    resources.forEach((resource) => {
      /**
       * attach resource config to mobx tree before calling propRef
       */
      this.propService.add(resource.config)

      this.add(resource)
    })
  }

  @modelAction
  add({ config, id, name, owner, type }: IResourceDTO) {
    const resource = Resource.create({
      config,
      id,
      name,
      owner,
      type,
    })

    this.resources.set(resource.id, resource)

    return resource
  }
}
