import type {
  ICreateResourceData,
  IResourceModel,
  IResourceService,
  IUpdateResourceData,
} from '@codelab/frontend/abstract/domain'
import { getPropService } from '@codelab/frontend/domain/prop'
import {
  InlineFormService,
  ModalService,
} from '@codelab/frontend/domain/shared'
import type { ResourceWhere } from '@codelab/shared/abstract/codegen'
import type { IPropDTO } from '@codelab/shared/abstract/core'
import { IResourceDTO } from '@codelab/shared/abstract/core'
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
import { ResourceFormService } from './resource-form.service'
import { ResourceModalService } from './resource-modal.service'

@model('@codelab/ResourceService')
export class ResourceService
  extends Model({
    createForm: prop(() => new InlineFormService({})),
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new ResourceModalService({})),
    resourceRepository: prop(() => new ResourceRepository({})),
    resources: prop(() => objectMap<IResourceModel>()),
    updateForm: prop(() => new ResourceFormService({})),
    updateModal: prop(() => new ResourceModalService({})),
  })
  implements IResourceService
{
  @computed
  get resourceList() {
    return [...this.resources.values()]
  }

  @modelFlow
  @transaction
  create = _async(function* (
    this: ResourceService,
    { config: configData, id, name, type }: ICreateResourceData,
  ) {
    const configProps: IPropDTO = {
      data: JSON.stringify(configData),
      id: v4(),
    }

    this.propService.add(configProps)

    const resource = this.add({
      config: configProps,
      id,
      name,
      type,
    })

    yield* _await(this.resourceRepository.add(resource))

    return resource
  })

  @modelFlow
  @transaction
  delete = _async(function* (
    this: ResourceService,
    resources: Array<IResourceModel>,
  ) {
    // const { id } = resource

    resources.map((resource) => {
      this.resources.delete(resource.id)
    })

    yield* _await(this.resourceRepository.delete(resources))

    return
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: ResourceService, where: ResourceWhere = {}) {
    const { items: resources } = yield* _await(
      this.resourceRepository.find(where),
    )

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

  @modelAction
  add({ config, id, name, type }: IResourceDTO) {
    const resource = Resource.create({
      config,
      id,
      name,
      type,
    })

    this.resources.set(resource.id, resource)

    return resource
  }

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

  resource(id: string) {
    return this.resources.get(id)
  }

  @computed
  private get propService() {
    return getPropService(this)
  }
}
