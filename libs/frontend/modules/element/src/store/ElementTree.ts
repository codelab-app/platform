import {
  AtomFromFragmentInput,
  getAtomService,
} from '@codelab/frontend/modules/atom'
import {
  ComponentFragment,
  getComponentService,
} from '@codelab/frontend/modules/component'
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
import {
  ElementFragment,
  ElementGraphFragment,
} from '../graphql/Element.fragment.v2.1.graphql.gen'
import { Element } from './Element'
import { elementRef } from './elementRef'

const fromFragment = (fragment: ElementGraphFragment, rootId: string) => {
  const tree = new ElementTree({})

  tree.updateFromFragment(fragment, rootId)

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

  /** All root elements of the components in the main tree */
  componentRoots: prop(() => objectMap<Element>()),

  elementCache: prop(() => objectMap<Ref<Element>>()),
}) {
  @computed
  get elementsList() {
    return this.root ? [this.root, ...this.root.descendants] : []
  }

  element(id: string) {
    if (this.componentRoots.has(id)) {
      return this.componentRoots.get(id)
    }

    if (this.elementCache.has(id)) {
      return this.elementCache.get(id)?.maybeCurrent
    }

    const allRoots = [this.root, ...this.componentRoots.values()]

    for (const value of allRoots) {
      const element = value?.findDescendant(id)

      if (element) {
        this.elementCache.set(id, elementRef(element))

        return element
      }
    }

    return undefined
  }

  @modelAction
  addOrUpdateAll(elementFragments: Array<ElementFragment>, rootId?: string) {
    this.ensureAllAtomsAreAdded(elementFragments)
    this.ensureAllComponentsAreAdded(elementFragments)

    // Create all elements first. Keep them in a temp map. Then after all are created, assign parent/children
    const elements = new Map<string, Element>()
    const childToParentMap = new Map<string, string>()

    for (const fragment of elementFragments) {
      let element = this.element(fragment.id)

      if (element) {
        element.updateFromFragment(fragment)
      } else {
        element = Element.fromFragment(fragment)
      }

      elements.set(fragment.id, element)

      if (fragment.id === rootId) {
        this.root = element
      } else if (fragment.parentElement?.id) {
        childToParentMap.set(fragment.id, fragment.parentElement.id)
      } else if (fragment.component) {
        this.componentRoots.set(fragment.id, element)
      }
    }

    // Assign parent/children
    for (const addedElement of elements.values()) {
      const parentId = childToParentMap.get(addedElement.id)

      if (!parentId) {
        continue
      }

      const parent = elements.get(parentId) || this.element(parentId)

      if (!parent) {
        continue
      }

      parent.addChild(addedElement)
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
      if (this.elementCache.has(id)) {
        this.elementCache.delete(id)
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
  updateFromFragment({ vertices }: ElementGraphFragment, rootId: string) {
    return this.addOrUpdateAll(vertices, rootId)
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
  private ensureAllAtomsAreAdded(elements: Array<ElementFragment>) {
    // Add all non-existing atoms to the AtomStore, so we can safely reference them in Element
    const atomService = getAtomService(this)

    const allAtoms = elements
      .map((v) => v.atom)
      .filter(Boolean) as Array<AtomFromFragmentInput>

    atomService.addOrUpdateAll(allAtoms)
  }

  @modelAction
  private ensureAllComponentsAreAdded(elements: Array<ElementFragment>) {
    // Add all non-existing components to the ComponentStore, so we can safely reference them in Element
    const componentService = getComponentService(this)

    const allComponents = elements
      .map((v) => v.component)
      .filter(Boolean) as Array<ComponentFragment>

    componentService.addOrUpdateAll(allComponents)
  }

  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  public static fromFragment = fromFragment
}

export const elementTreeRef = rootRef<ElementTree>('codelab/ElementTreeRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
