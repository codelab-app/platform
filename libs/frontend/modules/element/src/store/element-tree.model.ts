import {
  getComponentService,
  getElementService,
} from '@codelab/frontend/presenter/container'
import { IElement, IElementTree } from '@codelab/shared/abstract/core'
import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  detach,
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
    id: idProp,
    _elements: prop(() => objectMap<Ref<IElement>>()),
    /** The root tree element */
    _root: prop<Nullable<Ref<IElement>>>(null).withSetter(),
  })
  implements IElementTree
{
  protected onAttachedToRootStore(rootStore: object) {
    // this.buildTree(this._elements.map((element) => element.current))
  }

  /**
   * All elements within the tree
   */
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

  // ^ get/set ts type must be identical
  set root(element: Maybe<IElement>) {
    if (element) {
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
   * Refactored to move hydration out of this function, keep this function as only creating references for tree shape
   */
  @modelAction
  addElements(elements: Array<IElement>) {
    elements.forEach((element) => {
      // add reference to new/existing element
      this._elements.set(element.id, elementRef(element))

      // validate component meta data
      if (element.renderComponentType?.current) {
        const componentId = element.renderComponentType?.current.id
        const component = this.componentService.components.get(componentId)

        if (!component) {
          throw new Error('Missing component')
        }
      }
    })

    return this
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
  public static init = init
}

export const elementTreeRef = rootRef<IElementTree>('@codelab/ElementTreeRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
