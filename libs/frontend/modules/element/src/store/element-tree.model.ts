import { getAtomService } from '@codelab/frontend/modules/atom'
import { getComponentService } from '@codelab/frontend/modules/component'
import {
  IComponentDTO,
  IElementDTO,
  isAtomDTO,
} from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
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
import { Element } from './element.model'
import { elementRef } from './element.ref'

const hydrate = (elements: Array<IElementDTO>, rootId: string) => {
  const tree = new ElementTree({})

  tree.updateCaches(elements, rootId)

  return tree
}

/**
 * ElementTree is a mobx store that holds the tree of elements.
 * It is used as a local observable store for a tree of elements.
 * It doesn't handle remote data, use elementService for that
 */
@model('@codelab/ElementTree')
export class ElementTree extends Model({
  id: idProp,

  /** The root tree element */
  root: prop<Nullable<Element>>(null).withSetter(),

  /**
   * A flat list of elements in the tree
   */
  elements: prop(() => objectMap<Ref<Element>>()),

  /** All root elements of the components in the main tree */
  componentRoots: prop(() => objectMap<Element>()),
}) {
  @computed
  get elementsList() {
    return this.root ? [this.root, ...this.root.descendants] : []
  }

  element(id: string) {
    if (this.componentRoots.has(id)) {
      return this.componentRoots.get(id)
    }

    return this.elements?.get(id)?.current
  }

  @modelAction
  updateCache(elementsDTO: Array<IElementDTO>, rootId?: string) {
    this.updateAtomsCache(elementsDTO)
    this.updateComponentsCache(elementsDTO)

    // Create all elements first. Keep them in a temp map. Then after all are created, assign parent/children
    const elements = new Map<string, Element>()

    for (const elementDTO of elementsDTO) {
      let element = this.element(elementDTO.id)

      // Update cache if exists, other create new
      element
        ? element.updateCache(elementDTO)
        : (element = Element.hydrate(elementDTO))

      elements.set(elementDTO.id, element)
      this.elements.set(elementDTO.id, elementRef(element))

      if (!elementDTO.parentElement?.id) {
        this.root = element
      } else if (elementDTO.component) {
        this.componentRoots.set(elementDTO.id, element)
      }
    }

    // Assign relationships
    for (const [_, element] of elements) {
      const parentId = element.parentId

      if (!parentId) {
        continue
      }

      const parent = elements.get(parentId) ?? this.element(parentId)

      if (!parent) {
        continue
      }

      parent?.addChild(element)
    }

    return [...elements.values()]
  }

  @modelAction
  removeElementAndDescendants(element: Element) {
    const elementAndDescendantIds = [
      element.id,
      ...element.descendants.map((e) => e.id),
    ]

    for (const id of elementAndDescendantIds) {
      if (this.elements.has(id)) {
        this.elements.delete(id)
      }
    }

    if (element.id === this.root?.id) {
      this.root = null
    } else {
      element.parentElement?.removeChild(element)
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
    if (newParent.id === element.id || newParent.findDescendant(element.id)) {
      throw new Error(`Cannot move element ${elementId} to itself`)
    }

    if (existingParent) {
      existingParent.removeChild(element)
    }

    newOrder = newOrder ?? element.parentElement?.lastChildOrder ?? 0
    element.setOrderInParent(newOrder)
    newParent.addChild(element)

    return element
  }

  @modelAction
  updateCaches(elements: Array<IElementDTO>, rootId: string) {
    return this.updateCache(elements, rootId)
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

export const elementTreeRef = rootRef<ElementTree>('codelab/ElementTreeRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
