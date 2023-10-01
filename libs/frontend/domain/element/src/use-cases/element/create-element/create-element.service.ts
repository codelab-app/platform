import type { ICreateElementService } from '@codelab/frontend/abstract/core'
import { getElementService } from '@codelab/frontend/abstract/core'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  transaction,
} from 'mobx-keystone'

@model('@codelab/CreateElementService')
export class CreateElementService
  extends Model({})
  implements ICreateElementService
{
  @modelFlow
  @transaction
  createElementAsFirstChild = _async(function* (
    this: CreateElementService,
    data: IElementDTO,
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

    /**
     * Syncs all components to the current element tree
     */
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
    data: IElementDTO,
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
