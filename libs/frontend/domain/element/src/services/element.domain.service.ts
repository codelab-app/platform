import type {
  IElementDomainService,
  IElementModel,
} from '@codelab/frontend/abstract/domain'
import { IMoveElementContext } from '@codelab/frontend/abstract/domain'
import { getPropService } from '@codelab/frontend/domain/prop'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { Element } from '../store'
import { validateElementDto } from './element.validate'
import { validateMoveElement } from './move-element.validation'

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
  resetModifiedElements() {
    for (const element of this.elements.values()) {
      element.set_modified(false)
    }
  }

  @modelAction
  add = (elementDto: IElementDTO): IElementModel => {
    console.debug('ElementDomainService.add()', elementDto)

    validateElementDto(elementDto)

    const props = {
      data: elementDto.props.data,
      // makeDefaultProps(renderType.current.api.current),
      id: elementDto.props.id,
    }

    this.propService.add(props)

    const element: IElementModel = Element.create(elementDto)

    this.elements.set(elementDto.id, element)

    this.move({
      element,
      nextSibling: element.nextSibling?.current,
      parentElement: element.parentElement?.current,
      prevSibling: element.prevSibling?.current,
    })

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
    const { element, nextSibling, parentElement, prevSibling } = context

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

  logElementTreeState() {
    ;[...this.elements.values()].forEach((element) => {
      const node = element.toTreeNode
      console.debug(node)
    })
  }

  @computed
  get propService() {
    return getPropService(this)
  }
}
