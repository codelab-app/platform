import { ModalService } from '@codelab/frontend/shared/utils'
import {
  CreateResourceData,
  CreateResourceProperties,
  IModalService,
  IResource,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'

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
    modelClass<ModalService<Ref<IResource>>>(ModalService),
    {},
  )
  implements IModalService<Ref<IResource>>
{
  @computed
  get resource() {
    return this.metadata?.current
  }
}
