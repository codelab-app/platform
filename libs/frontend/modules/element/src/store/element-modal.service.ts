import { ModalService } from '@codelab/frontend/shared/utils'
import {
  CreateElementData,
  CreateElementProperties,
  IElement,
  IModalService,
} from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'

@model('@codelab/CreateElementModalService')
export class CreateElementModalService
  extends ExtendedModel(
    modelClass<ModalService<CreateElementData>>(ModalService),
    {},
  )
  implements IModalService<CreateElementData, CreateElementProperties>
{
  @computed
  get parentElement() {
    return this.metadata?.parentElement?.current
  }
}

@model('@codelab/ElementModalService')
export class ElementModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IElement>>>(ModalService),
    {},
  )
  implements IModalService<Ref<IElement>, { element: Maybe<IElement> }>
{
  @computed
  get element() {
    return this.metadata?.current
  }
}
