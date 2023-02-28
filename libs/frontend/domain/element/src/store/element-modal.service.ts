import type {
  CreateElementData,
  CreateElementProperties,
  IElement,
  IEntityModalService,
  UpdateElementProperties,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/CreateElementModalService')
export class CreateElementModalService
  extends ExtendedModel(
    modelClass<ModalService<CreateElementData>>(ModalService),
    {},
  )
  implements IEntityModalService<CreateElementData, CreateElementProperties>
{
  @computed
  get parentElement() {
    return this.metadata?.parentElement.current
  }
}

@model('@codelab/UpdateElementModalService')
export class UpdateElementModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IElement>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<IElement>, UpdateElementProperties>
{
  @computed
  get element() {
    return this.metadata?.current
  }
}

@model('@codelab/ElementModalService')
export class ElementModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IElement>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<IElement>, { element: IElement }>
{
  @computed
  get element() {
    return this.metadata?.current
  }
}
