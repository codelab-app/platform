import { getAtomService } from '@codelab/frontend/modules/atom'
import { getComponentService } from '@codelab/frontend/modules/component'
import {
  IComponentDTO,
  IElementDTO,
  IElementTree,
  isAtomDTO,
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
import { Element } from './element.model'
import { elementRef } from './element.ref'
import type { ElementService } from './element.service'

const hydrate = (elements: Array<IElementDTO>, rootId: string) => {
  const tree = new ElementTree({})

  tree.updateCache(elements, rootId)

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
    _root: prop<Nullable<Ref<Element>>>(null).withSetter(),

    /** All root elements of the components in the main tree */
    componentRoots: prop(() => objectMap<Ref<Element>>()),
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

  @modelAction
  updateCache(
    elementsDTO: Array<IElementDTO>,
    rootId?: string,
    updateRoot = true,
  ) {
    this.updateAtomsCache(elementsDTO)
    this.updateComponentsCache(elementsDTO)

    for (const elementDTO of elementsDTO) {
      const element = this.element(elementDTO.id) || Element.hydrate(elementDTO)

      // Update cache if exists, other create new
      this.updateOrCreate(element, elementDTO)

      if (elementDTO.component) {
        this.componentRoots.set(elementDTO.id, elementRef(element))
      }

      /**
       * this sets the root for the main trees
       * main trees are :
       *      - page elements tree
       *      - provider elements tree
       *      - component elements tree
       * sub trees
       *      - components referenced by element (instanceOfComponent)
       *           loaded with the main tree so (elementDTO.id === rootId) will eliminate them
       *      - components referenced by props (ReactNodeType, RenderPropsType)
       *           not loaded with the main tree therefor we use (updateRoot)
       */
      if (elementDTO.id === rootId && updateRoot) {
        this.set_root(elementRef(element))
      }
    }

    // Assign relationships
    for (const [_, element] of this.elements) {
      const parentId = element.parentId

      if (!parentId) {
        continue
      }

      const parent = this.element(parentId)

      if (!parent || parent.hasChild(element)) {
        continue
      }

      parent?.addChild(element)
    }

    return [...this.elements.values()]
  }

  updateOrCreate(element: Element, elementDTO: IElementDTO) {
    if (this.elements.has(element.id)) {
      element.updateCache(elementDTO)

      return
    }

    this.elements.set(element.id, element)
  }

  /**
   * Moves an element to a different parent and/or order
   */
  @modelAction
  moveElement(
    elementId: string,
    newParentId: string,
    newOrder?: number,
  ): Element {
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

  getPathFromRoot(selectedElement: Element): Array<Element> {
    const path = []
    let current: Element | undefined = selectedElement

    while (current) {
      path.push(current)
      current = current.parentElement
    }

    return path.reverse()
  }

  @modelAction
  private updateAtomsCache(elements: Array<IElementDTO>) {
    // Add all non-existing atoms to the AtomStore, so we can safely reference them in Element
    const atomService = getAtomService(this)
    const atoms = elements.map((element) => element.atom).filter(isAtomDTO)

    atomService.updateCache(atoms)
  }

  @modelAction
  private updateComponentsCache(elements: Array<IElementDTO>) {
    // Add all non-existing components to the ComponentStore, so we can safely reference them in Element
    const componentService = getComponentService(this)

    const allComponents = elements
      .map((v) => v.component)
      .filter(Boolean) as Array<IComponentDTO>

    componentService.updateCaches(allComponents)
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
