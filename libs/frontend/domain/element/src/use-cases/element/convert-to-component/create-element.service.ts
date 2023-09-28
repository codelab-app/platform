import {
  IElementModel,
  IComponentModel,
  elementRef,
  getElementService,
  ICreateElementData,
  getComponentService,
  getBuilderService,
  IPropData,
  ICreateElementService,
} from '@codelab/frontend/abstract/core'
import { getPropService } from '@codelab/frontend/domain/prop'
import {
  getActionService,
  getStoreService,
} from '@codelab/frontend/domain/store'
import { getFieldService, getTypeService } from '@codelab/frontend/domain/type'
import {
  IElementDTO,
  IElementRenderTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { mapDeep } from '@codelab/shared/utils'
import { computed } from 'mobx'
import {
  Model,
  _async,
  _await,
  model,
  modelFlow,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'

@model('@codelab/CreateElementService')
export class CreateElementService
  extends Model({})
  implements ICreateElementService
{
  @modelFlow
  @transaction
  createElementAsFirstChild = _async(function* (
    this: CreateElementService,
    data: ICreateElementData,
  ) {
    console.debug('createElementAsFirstChild()', data)

    if (!data.parentElement?.id) {
      throw new Error("Parent element id doesn't exist")
    }

    const element = yield* _await(this.elementService.create(data))

    const affectedNodeIds = this.moveElementService.attachElementAsFirstChild({
      element,
      parentElement: data.parentElement,
    })

    const parentElementClone = [
      ...this.elementService.clonedElements.values(),
    ].find(({ sourceElement }) => sourceElement?.id === data.parentElement?.id)

    if (parentElementClone) {
      const elementClone = element.clone()

      this.moveElementService.attachElementAsFirstChild({
        element: elementClone,
        parentElement: parentElementClone,
      })
    }

    yield* _await(this.elementService.updateAffectedElements(affectedNodeIds))

    return element
  })

  @modelFlow
  @transaction
  createElementAsNextSibling = _async(function* (
    this: CreateElementService,
    data: ICreateElementData,
  ) {
    console.debug('ElementService.createElementAsNextSibling()', data)

    if (!data.prevSibling) {
      throw new Error('Missing previous sibling')
    }

    const element = yield* _await(this.elementService.create(data))
    const prevSibling = this.elementService.element(data.prevSibling.id)

    const affectedNodeIds = this.moveElementService.attachElementAsNextSibling({
      element,
      targetElement: prevSibling,
    })

    yield* _await(this.elementService.updateAffectedElements(affectedNodeIds))

    return element
  })

  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  private get moveElementService() {
    return this.elementService.moveElementService
  }
}
