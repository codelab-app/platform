import type {
  CreateElementData,
  CreateElementProperties,
  IElement,
  IEntityFormService,
  UpdateElementProperties,
} from '@codelab/frontend/abstract/core'
import { InlineFormService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/CreateElementFormService')
export class CreateElementFormService
  extends ExtendedModel(
    modelClass<InlineFormService<CreateElementData>>(InlineFormService),
    {},
  )
  implements IEntityFormService<CreateElementData, CreateElementProperties>
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

@model('@codelab/UpdateElementFormService')
export class UpdateElementFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IElement>>>(InlineFormService),
    {},
  )
  implements IEntityFormService<Ref<IElement>, UpdateElementProperties>
{
  @computed
  get element() {
    return this.metadata?.current
  }
}
