import type {
  IElement,
  IElementTree,
  IPageNodeRef,
} from '@codelab/frontend/abstract/core'
import {
  elementRef,
  getComponentService,
  getElementService,
  isComponentInstance,
  isElementPageNodeRef,
} from '@codelab/frontend/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  idProp,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
  Ref,
  walkTree,
  WalkTreeMode,
} from 'mobx-keystone'

/**
 * Helper method to initialize an element tree
 *
 * @param elements
 * @param elementService required as param since during constructor function, this isn't attached to the root yet
 */
const init = (rootElement: IElement, elements: Array<IElement> = []) => {
  return new ElementTree({
    _elements: elements.reduce((elementMap, element) => {
      elementMap.set(element.id, elementRef(element))

      return elementMap
    }, objectMap<Ref<IElement>>()),
    _root: elementRef(rootElement),
  })
}

/**
 * ElementTree is a mobx store that holds the tree of elements.
 * It is used as a local observable store for a tree of elements.
 * It doesn't handle remote data, use elementService for that
 *
 * ElementTree is just a required data structure for RenderService to work. The end goal is to render elements on a page, so we move this under RenderService
 */
@model('@codelab/ElementTree')
export class ElementTree
  extends Model({
    _elements: prop(() => objectMap<Ref<IElement>>()),
    /** The root tree element */
    _root: prop<Nullable<Ref<IElement>>>(null).withSetter(),
    id: idProp,
  })
  implements IElementTree
{
  /**
   * All elements within the tree
   */
  @computed
  get elements() {
    return this._root
      ? [this._root.current, ...this._root.current.descendantElements]
      : []
  }

  @computed
  get name() {
    const parentComponent = this.root?.parentComponent?.current

    return parentComponent ? parentComponent.name : 'Page'
  }

  @computed
  get root() {
    return this._root?.current
  }

  // ^ get/set ts type must be identical
  set root(element: Maybe<IElement>) {
    if (element) {
      // eslint-disable-next-line canonical/id-match
      this._root = elementRef(element)
    }
  }

  @computed
  get elementService() {
    return getElementService(this)
  }

  element(id: string) {
    return this._elements.get(id)?.maybeCurrent
  }

  @computed
  get componentService() {
    return getComponentService(this)
  }

  /**
   * Get all descendant elements of current subRoot
   */
  @modelAction
  descendants(subRoot: Ref<IElement>) {
    const descendants: Array<IElement> = []

    walkTree(
      subRoot,
      (node) => {
        descendants.push(node as IElement)
      },
      // Walks from root to children
      WalkTreeMode.ParentFirst,
    )

    return descendants
  }

  /**
   * Refactored to move hydration out of this function, keep this function as only creating references for tree shape
   */
  @modelAction
  addElements(elements: Array<IElement>) {
    elements.forEach((element) => {
      // add reference to new/existing element
      this._elements.set(element.id, elementRef(element))

      // validate component meta data
      if (isComponentInstance(element.renderType)) {
        const componentId = element.renderType.current.id
        const component = this.componentService.components.get(componentId)

        if (!component) {
          throw new Error('Missing component')
        }
      }
    })

    return this
  }

  @modelAction
  removeElements(elements: Array<IElement>) {
    elements.forEach((element) => {
      this._elements.delete(element.id)
    })

    return this
  }

  getPathFromRoot(selectedElement: IPageNodeRef): Array<IElement> {
    const path = []

    if (!isElementPageNodeRef(selectedElement)) {
      return []
    }

    let currentElement = selectedElement.maybeCurrent

    while (currentElement) {
      path.push(currentElement)
      currentElement = currentElement.parent?.current
    }

    return path.reverse()
  }

  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  static init = init

  // static getElementTree = getElementTree
}
