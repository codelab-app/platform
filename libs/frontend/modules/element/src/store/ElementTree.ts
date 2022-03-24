import {
  Component,
  ComponentFragment,
} from '@codelab/frontend/modules/component'
import { Nullish } from '@codelab/shared/abstract/types'
import { flatMap } from 'lodash'
import { computed } from 'mobx'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
  rootRef,
} from 'mobx-keystone'
import {
  ElementEdgeFragment,
  ElementGraphFragment,
} from '../graphql/Element.fragment.v2.1.graphql.gen'
import { Element } from './Element'
import { elementRef } from './elementRef'

const sortEdges = (a: ElementEdgeFragment, b: ElementEdgeFragment) => {
  // Then by the edge order, so that we can get a consistent ordering in the children array
  if (a.source === b.source) {
    return (b.order || 1) - (a.order || 1)
  }

  // Order by source first
  return a.source > b.source ? 1 : -1
}

/**
 * ElementTree is a mobx store that holds the tree of elements.
 * It is used as a local observable store for a tree of elements.
 * It doesn't handle remote data, use elementService for that
 */
@model('@codelab,ElementTree')
export class ElementTree extends Model({
  id: idProp,

  elements: prop(() => objectMap<Element>()),
  components: prop(() => objectMap<Component>()),
}) {
  @computed
  get elementsList() {
    return [...this.elements.values()]
  }

  @computed
  get root() {
    for (const element of this.elements.values()) {
      if (element.isRoot) {
        return element
      }
    }

    return null
  }

  element(id: string) {
    return this.elements.get(id)
  }

  @modelAction
  addElement(element: Element) {
    this.elements.set(element.id, element)

    return element
  }

  @modelAction
  addComponent(component: Component) {
    this.components.set(component.id, component)

    return component
  }

  getRootElementOfComponent(component: Component) {
    const rootElement = this.element(component.rootElementId)

    if (!rootElement) {
      console.warn(`Could not find root element for component ${component.id}`)
    }

    return rootElement
  }

  /**
   * Returns the element with the given id and all of its descendant elements
   */
  getElementAndDescendants(id: string): Array<Element> {
    const element = this.element(id)

    if (!element) {
      return []
    }

    const cache = new Set<string>()

    const getDescendants = (_e: Element): Array<Element> => {
      if (cache.has(_e.id)) {
        return []
      }

      cache.add(_e.id)

      const children = _e.childrenList

      return [...children, ...flatMap(children, getDescendants)]
    }

    const descendants = getDescendants(element)

    return [element, ...descendants]
  }

  @modelAction
  removeElementAndDescendants(element: Element) {
    for (const item of this.getElementAndDescendants(element.id)) {
      this.elements.delete(item.id)
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
    if (newParent.id === element.id) {
      throw new Error(`Cannot move element ${elementId} to itself`)
    }

    if (existingParent?.current) {
      existingParent.current.removeChild(element.id)
    }

    newParent.addChild(element, newOrder)

    return element
  }

  @modelAction
  updateFromFragment({ vertices, edges }: ElementGraphFragment) {
    this.elements.clear()

    const root = vertices.find((v) => !v.parentElement)

    if (!root) {
      throw new Error('No root element found')
    }

    const getOrCreateComponent = (
      data: Nullish<ComponentFragment>,
    ): Component | null => {
      if (!data) {
        return null
      }

      if (this.components.has(data.id)) {
        return this.components.get(data.id) as Component
      }

      const component = Component.fromFragment(data)

      this.components.set(data.id, component)

      return component
    }

    // Map each element fragment to an element model and put it in the tree
    for (const v of vertices) {
      // Make sure we have the components first because we reference them in the element
      getOrCreateComponent(v.component)
      getOrCreateComponent(v.instanceOfComponent)

      const element = Element.fromFragment(v)
      this.addElement(element)
    }

    // Attach the children. Sort the edges to match the children order to the db edge order
    edges.sort(sortEdges).forEach((edge) => {
      const source = this.element(edge.source)
      const target = this.element(edge.target)

      if (!source || !target) {
        throw new Error('Can not find source or target element of edge')
      }

      source.addChild(target)
      target.setParentElement(elementRef(source.id))
    })

    return this
  }

  public static fromFragment(fragment: ElementGraphFragment) {
    return new ElementTree({}).updateFromFragment(fragment)
  }
}

export const elementTreeRef = rootRef<ElementTree>('codelab/ElementTreeRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
