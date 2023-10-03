import type {
  CreateElementData,
  CreateElementProperties,
  IElementModel,
  IEntityModalService,
  UpdateElementProperties,
} from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
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
  /**
   * The default parent element for the element to be created.
   * The parent element is the selected node in the explorer tree
   * if it belongs to the element tree. Otherwise, it's the root
   * of the tree.
   */
  @computed
  get parentElement() {
    const elementTree = this.metadata?.elementTree.current
    const selectedElement = this.metadata?.selectedElement?.current

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
    return this.metadata?.current
  }
}

@model('@codelab/ElementModalService')
export class ElementModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IElementModel>>>(ModalService),
    {},
  )
  implements
    IEntityModalService<Ref<IElementModel>, { element: IElementModel }>
{
  @computed
  get element() {
    return this.metadata?.current
  }
}
