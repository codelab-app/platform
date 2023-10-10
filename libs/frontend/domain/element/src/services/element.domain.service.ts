import type {
  IElementDomainService,
  IElementModel,
  IMoveFirstChildProps,
} from '@codelab/frontend/abstract/domain'
import {
  elementRef,
  IMoveElementContext,
} from '@codelab/frontend/abstract/domain'
import { getPropService } from '@codelab/frontend/domain/prop'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { throwIfUndefined } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { Element } from '../store'
import { isAddingAsFirstChild, validateElementDto } from './element.validate'
import { validateMoveElement } from '@codelab/frontend/application/element'

@model('@codelab/ElementDomainService')
export class ElementDomainService
  extends Model({
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
  add = (elementDto: IElementDTO): IElementModel => {
    validateElementDto(elementDto)

    const props = {
      data: elementDto.props.data,
      // makeDefaultProps(renderType.current.api.current),
      id: elementDto.props.id,
    }

    this.propService.add(props)
    console.debug('ElementService.add()', elementDto)

    const element: IElementModel = Element.create(elementDto)

    this.elements.set(elementDto.id, element)

    /**
     * Moves an element as a first child to a parent. Bumps the existing firstChild as nextSibling
     *
     * (parent)
     * \
     * (firstChild)
     *
     * (parent)
     * \
     * [element]-(firstChild)
     */
    if (isAddingAsFirstChild(element)) {
      // TODO: Add type assertion
      const parentElement = throwIfUndefined(element.parentElement?.current)

      /**
       * If parent already has a firstChild, we'll need to attach the new element as the previous sibling
       */
      if (parentElement.firstChild) {
        const currentFirstChild = parentElement.firstChild
        element.attachAsPrevSibling(currentFirstChild.current)

        // this.elementsToUpdate.set(currentFirstChild.id, currentFirstChild)
      }

      element.attachAsFirstChild(parentElement)

      // this.elementsToUpdate.set(parentElement.id, elementRef(parentElement))
      // this.elementsToUpdate.set(element.id, elementRef(element))
    } else {
      /**
       * Element appends as next sibling to target
       *
       * (target)-(nextSibling)
       * (target)-[element]-(nextSibling)
       */
      const prevSibling = throwIfUndefined(element.prevSibling?.current)

      if (prevSibling.nextSibling) {
        element.attachAsPrevSibling(prevSibling.nextSibling.current)

        // this.elementsToUpdate.set(prevSibling.)
      }

      element.attachAsNextSibling(prevSibling)
    }

    return element
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
    const { element, prevSibling, nextSibling, parentElement } = context

    validateMoveElement(context)

    if (parentElement) {
      element.attachAsFirstChild(parentElement)
    }

    if (nextSibling) {
      element.attachAsPrevSibling(nextSibling)
    }

    if (prevSibling) {
      element.attachAsNextSibling(prevSibling)
    }
  }

  @computed
  get propService() {
    return getPropService(this)
  }
}
