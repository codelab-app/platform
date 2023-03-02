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
import { ResourceRepository } from './resource.repository'
import { ResourceModalService } from './resource-modal.service'

@model('@codelab/Resource')
export class ResourceService
  extends Model({
    resources: prop(() => objectMap<IResource>()),
    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new ResourceModalService({})),
    deleteModal: prop(() => new ResourceModalService({})),
    resourceRepository: prop(() => new ResourceRepository({})),
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
    const resources = yield* _await(this.resourceRepository.get(where))

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
    { id, type, name, config: configData, owner }: ICreateResourceData,
  ) {
    const config = this.propService.add({
      id: v4(),
      data: JSON.stringify(configData),
    })

    const resource = this.add({
      id,
      type,
      name,
      config,
      owner,
    })

    yield* _await(this.resourceRepository.create(resource))

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
  delete = _async(function* (this: ResourceService, id: string) {
    const resource = this.resources.get(id)!

    this.resources.delete(id)

    yield* _await(this.resourceRepository.delete(id))

    return resource
  })

  @modelAction
  load(resources: Array<IResourceDTO>) {
    resources.forEach((resource) => this.add(resource))
  }

  @modelAction
  add({ id, name, config, type, owner }: IResourceDTO) {
    const resource = Resource.create({
      id,
      name,
      config,
      type,
      owner,
    })

    this.resources.set(resource.id, resource)

    return resource
  }
}
