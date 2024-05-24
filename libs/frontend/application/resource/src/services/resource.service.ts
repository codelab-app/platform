import type { IResourceService } from '@codelab/frontend/abstract/application'
import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import {
  InlineFormService,
  ModalService,
} from '@codelab/frontend-application-shared-store/ui'
import { ResourceDomainService } from '@codelab/frontend-domain-resource/services'
import type { ResourceWhere } from '@codelab/shared/abstract/codegen'
import type {
  ICreateResourceData,
  IPropDto,
  IResourceDto,
  IUpdateResourceData,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { ResourceRepository } from './resource.repo'
import { ResourceFormService } from './resource-form.service'
import { ResourceModalService } from './resource-modal.service'

@model('@codelab/ResourceService')
export class ResourceService
  extends Model({
    createForm: prop(() => new InlineFormService({})),
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new ResourceModalService({})),
    resourceDomainService: prop(() => new ResourceDomainService({})),
    resourceRepository: prop(() => new ResourceRepository({})),
    updateForm: prop(() => new ResourceFormService({})),
    updateModal: prop(() => new ResourceModalService({})),
  })
  implements IResourceService
{
  @computed
  get resourceList() {
    return [...this.resourceDomainService.resources.values()]
  }

  @modelFlow
  @transaction
  create = _async(function* (
    this: ResourceService,
    { config: configData, id, name, type }: ICreateResourceData,
  ) {
    const configProps: IPropDto = {
      data: JSON.stringify(configData),
      id: v4(),
    }

    const resource = this.resourceDomainService.hydrate({
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
      this.resourceDomainService.resources.delete(resource.id)
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

    return resources.map((resource) =>
      this.resourceDomainService.hydrate(resource),
    )
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: ResourceService, id: string) {
    const [resource] = yield* _await(this.getAll({ id }))

    return resource
  })

  @modelFlow
  getSelectResourceOptions = _async(function* (this: ResourceService) {
    const resources = yield* _await(this.getAll())

    return resources.map((resource) => ({
      label: resource.name,
      value: resource.id,
    }))
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ResourceService,
    { config: configData, id, name, type }: IUpdateResourceData,
  ) {
    const resource = this.resourceDomainService.resources.get(id)!
    const config = resource.config

    /**
     * Write cache for inner model config of type Prop
     */
    config.writeCache({ data: JSON.stringify(configData) })
    resource.writeCache({ name, type })

    yield* _await(this.resourceRepository.update(resource))

    return resource
  })

  @modelAction
  load(resources: Array<IResourceDto>) {
    resources.forEach((resource) =>
      this.resourceDomainService.hydrate(resource),
    )
  }

  resource(id: string) {
    return this.resourceDomainService.resources.get(id)
  }
}
