import {
  CreateElementData,
  CreateElementProperties,
  IElement,
  IEntityModalService,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'

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
