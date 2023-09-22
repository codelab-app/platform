import type {
  CreateElementData,
  CreateElementProperties,
  IEntityFormService,
  IFormService,
  UpdateElementProperties,
} from '@codelab/frontend/abstract/application'
import type { IElementModel } from '@codelab/frontend/abstract/domain'
import { InlineFormService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/CreateElementFormService')
export class CreateElementFormService
  extends ExtendedModel(
    modelClass<InlineFormService<CreateElementData>>(InlineFormService),
    {},
  )
  implements IFormService<CreateElementData, CreateElementProperties>
{
  /**
   * The default parent element for the element to be created.
   * The parent element is the selected node in the explorer tree
   * if it belongs to the element tree. Otherwise, it's the root
   * of the tree.
   */
  @computed
  get parentElement() {
    const elementTree = this.metadata?.elementTree
    const selectedElement = this.metadata?.selectedElement

    if (!elementTree) {
      return undefined
    }

    if (
      selectedElement &&
      elementTree.current.elements.includes(selectedElement.current)
    ) {
      return selectedElement.current
    }

    return elementTree.current.rootElement.current
  }
}

@model('@codelab/UpdateElementFormService')
export class UpdateElementFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IElementModel>>>(InlineFormService),
    {},
  )
  implements IEntityFormService<Ref<IElementModel>, UpdateElementProperties>
{
  @computed
  get element() {
    return this.metadata?.current
  }
}
