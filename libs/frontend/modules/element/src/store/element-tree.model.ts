import { getElementService } from '@codelab/frontend/presenter/container'
import {
  IElement,
  IElementDTO,
  IElementTree,
} from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  detach,
  getParent,
  idProp,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { elementRef } from './element.ref'
import type { ElementService } from './element.service'

const hydrate = async (elements: Array<IElementDTO>, rootId: string) => {
  const tree = new ElementTree({})
  // const elementModels = tree.elementService.hydrateOrUpdateCache(elements)
  // tree.buildTree(elementModels)

  return tree
}

/**
 * ElementTree is a mobx store that holds the tree of elements.
 * It is used as a local observable store for a tree of elements.
 * It doesn't handle remote data, use elementService for that
 */
@model('@codelab/ElementTree')
export class ElementTree
  extends Model({
    id: idProp,

    /** The root tree element */
    _root: prop<Nullable<Ref<IElement>>>(null).withSetter(),

    /** All root elements of the components in the main tree */
    componentRoots: prop(() => objectMap<Ref<IElement>>()),
  })
  implements IElementTree
{
  @computed
  get elementsList() {
    return this._root
      ? [this._root.current, ...(this._root.current?.descendants ?? [])]
      : []
  }

  @computed
  get root() {
    return this._root?.current
  }

  get elementService() {
    return getElementService(this)
  }

  // Need to use get parent to get the ElementService, otherwise getElementService may get the wrong service depending on who's calling
  @computed
  get elements() {
    const parent = getParent<ElementService>(this)

    if (!parent) {
      throw new Error('Missing ElementService')
    }

    if (parent.$modelType === '@codelab/ElementService') {
      return parent.elements
    }

    throw new Error('Missing ElementService')
  }

  element(id: string) {
    if (this.componentRoots.has(id)) {
      return this.componentRoots.get(id)?.current
    }

    return this.elements?.get(id)
  }

  /**
   * Refactored to move hydration out of this function, keep this function as only creating references for tree shape
   */
  @modelAction
  buildTree(elements: Array<IElement>) {
    for (const element of elements) {
      if (!element.parentElement?.id) {
        this.set_root(elementRef(element))
      }

      if (element.component) {
        this.componentRoots.set(element.id, elementRef(element))
      }

      const parentId = element.parentElement?.id

      if (!parentId) {
        continue
      }

      const parent = this.element(parentId)

      if (!parent || parent.hasChild(element)) {
        continue
      }

      parent?.addChild(element)
    }
  }

  /**
   * Moves an element to a different parent and/or order
   */
  @modelAction
  moveElement(
    elementId: string,
    newParentId: string,
    newOrder?: number,
  ): IElement {
    const element = this.element(elementId)

    if (!element) {
      throw new Error(`Element ${elementId} not found`)
    }

    const existingParent = element.parentElement
    const newParent = this.element(newParentId)

    if (!newParent) {
      throw new Error(`Parent element ${newParentId} not found`)
    }

    // make sure it won't be a child of itself or a descendant
    if (newParent.id === element.id || element.findDescendant(newParent.id)) {
      throw new Error(`Cannot move element ${elementId} to itself`)
    }

    if (existingParent) {
      existingParent.removeChild(element)
    }

    newOrder = newOrder ?? element.parentElement?.lastChildOrder ?? 0
    element.setOrderInParent(newOrder ?? null)
    newParent.addChild(element)

    return element
  }

  getPathFromRoot(selectedElement: IElement): Array<IElement> {
    const path = []
    let current: IElement | undefined = selectedElement

    while (current) {
      path.push(current)
      current = current.parentElement
    }

    return path.reverse()
  }

  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  public static hydrate = hydrate
}

export const elementTreeRef = rootRef<ElementTree>('@codelab/ElementTreeRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
