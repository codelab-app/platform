import type {
  CreateElementData,
  CreateElementProperties,
  IEntityModalService,
  IModalService,
  UpdateElementProperties,
} from '@codelab/frontend/abstract/application'
import type { IElementModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend-application-shared-store/ui'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/CreateElementModalService')
export class CreateElementModalService
  extends ExtendedModel(
    modelClass<ModalService<CreateElementData>>(ModalService),
    {},
  )
  implements IModalService<CreateElementData, CreateElementProperties>
{
  /**
   * The default parent element for the element to be created.
   * The parent element is the selected node in the explorer tree
   * if it belongs to the element tree. Otherwise, it's the root
   * of the tree.
   */
  @computed
  get parentElement() {
    const elementTree = this.data?.elementTree.current
    const selectedElement = this.data?.selectedElement?.current

    if (!elementTree) {
      return undefined
    }

    if (selectedElement && elementTree.elements.includes(selectedElement)) {
      return selectedElement
    }

    return elementTree.rootElement.maybeCurrent
  }
}

@model('@codelab/UpdateElementModalService')
export class UpdateElementModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IElementModel>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<IElementModel>, UpdateElementProperties>
{
  @computed
  get element() {
    return this.data?.current
  }
}

@model('@codelab/ElementModalService')
export class ElementModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IElementModel>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<IElementModel>, UpdateElementProperties>
{
  @computed
  get element() {
    return this.data?.current
  }
}
