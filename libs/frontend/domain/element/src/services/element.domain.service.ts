import type {
  IElementDomainService,
  IElementModel,
} from '@codelab/frontend/abstract/domain'
import {
  IMoveElementContext,
  IUpdateElementData,
} from '@codelab/frontend/abstract/domain'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { Element } from '../store'
import { validateElementDto } from './element.validate'
import { validateMoveElement } from './move-element.validation'

@model('@codelab/ElementDomainService')
export class ElementDomainService
  extends Model({
    clonedElements: prop(() => objectMap<IElementModel>()),
    /**
     * Contains all elements
     *
     * - Elements part of rootTree
     * - Elements that are detached
     */
    elements: prop(() => objectMap<IElementModel>()),
  })
  implements IElementDomainService
{
  @computed
  get modifiedElements() {
    return [...this.elements.values()].filter((element) => element._modified)
  }

  @modelAction
  resetModifiedElements() {
    for (const element of this.elements.values()) {
      element.set_modified(false)
    }
  }

  @modelAction
  removeClones(elementId: string) {
    return [...this.clonedElements.entries()]
      .filter(([id, component]) => component.sourceElement?.id === elementId)
      .forEach(([id]) => {
        // this.moveElementService.detachElementFromElementTree(id)
        this.clonedElements.delete(id)
      })
  }

  @modelAction
  element(id: string) {
    const element = this.maybeElement(id)

    if (!element) {
      throw new Error('Missing element')
    }

    return element
  }

  @modelAction
  maybeElement(id: string) {
    return this.elements.get(id) || this.clonedElements.get(id)
  }

  @modelAction
  addTreeNode = (elementDto: IElementDTO) => {
    const element = this.hydrate(elementDto)

    this.move({
      element,
      nextSibling: element.nextSibling?.current,
      parentElement: element.parentElement?.current,
      prevSibling: element.prevSibling?.current,
    })

    return element
  }

  /**
   * This add can be used as is when we are hydrating element tree data that has the proper connections.
   *
   * But when we are adding a new node, it requires the move function to be called
   */
  @modelAction
  hydrate = (elementDto: IElementDTO): IElementModel => {
    console.debug('ElementDomainService.hydrate()', elementDto)

    validateElementDto(elementDto)

    const element: IElementModel = Element.create(elementDto)

    this.elements.set(elementDto.id, element)

    return element
  }

  @modelAction
  writeCloneCache({ id, ...elementData }: IUpdateElementData) {
    return [...this.clonedElements.values()]
      .filter((clonedElement) => clonedElement.sourceElement?.id === id)
      .map((clonedElement) => clonedElement.writeCache({ ...elementData }))
  }

  /**
   * Whether we want to move the element
   *
   * 1) as firstChild (by setting parentElement)
   * 2) as prevSibling (by setting nextSibling)
   * 3) as nextSibling (by setting prevSibling)
   */
  @modelAction
  move(context: IMoveElementContext) {
    console.debug('ElementDomainService.move()', context)

    const { element, nextSibling, parentElement, prevSibling } = context

    validateMoveElement(context)

    if (parentElement) {
      if (parentElement !== element.parentElement?.current) {
        element.detachFromTree()
      }

      element.attachAsFirstChild(parentElement)
    }

    if (nextSibling) {
      if (nextSibling !== element.nextSibling?.current) {
        element.detachFromTree()
      }

      element.attachAsPrevSibling(nextSibling)
    }

    if (prevSibling) {
      if (prevSibling !== element.prevSibling?.current) {
        element.detachFromTree()
      }

      element.attachAsNextSibling(prevSibling)
    }
  }

  logElementTreeState() {
    ;[...this.elements.values()].forEach((element) => {
      const node = element.toTreeNode

      console.debug(node)
    })
  }
}
