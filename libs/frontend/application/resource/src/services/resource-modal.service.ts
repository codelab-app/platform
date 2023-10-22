import type {
  CreateResourceData,
  CreateResourceProperties,
  IEntityModalService,
  IModalService,
} from '@codelab/frontend/abstract/application'
import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/CreateResourceModalService')
export class CreateResourceModalService
  extends ExtendedModel(
    modelClass<ModalService<CreateResourceData>>(ModalService),
    {},
  )
  implements IModalService<CreateResourceData, CreateResourceProperties>
{
  @computed
  get type() {
    return this.metadata?.type
  }
}

@model('@codelab/ResourceModalService')
export class ResourceModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IResourceModel>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<IResourceModel>>
{
  @computed
  get resource() {
    return this.metadata?.current
  }
}
