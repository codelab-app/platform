import { Nullable } from '@codelab/shared/abstract/types'
import { flatMap } from 'lodash'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop, Ref } from 'mobx-keystone'
import {
  ElementEdgeFragment,
  ElementGraphFragment,
} from '../graphql/Element.fragment.v2.1.graphql.gen'
import { ElementModel, elementRef } from './ElementModel'

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
 * It doesn't handle remote data, use elementStore for that
 */
@model('@codelab,ElementTree')
export class ElementTree extends Model({
  elements: prop(() => objectMap<ElementModel>()),
  root: prop<Nullable<Ref<ElementModel>>>(() => null),
}) {
  @computed
  get elementsList() {
    return [...this.elements.values()]
  }

  element(id: string) {
    return this.elements.get(id)
  }

  @modelAction
  addElement(element: ElementModel) {
    this.elements.set(element.id, element)

    return element
  }

  /**
   * Returns the element with the given id and all of its descendant elements
   */
  getElementAndDescendants(id: string): Array<ElementModel> {
    const element = this.element(id)

    if (!element) {
      return []
    }

    const cache = new Set<string>()

    const getDescendants = (_e: ElementModel): Array<ElementModel> => {
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
  removeElementAndDescendants(element: ElementModel) {
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
  ): ElementModel {
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

    // Map each element fragment to an element model and put it in the tree
    for (const v of vertices) {
      const element = ElementModel.fromFragment(v)
      this.addElement(element)

      if (element.id === root.id) {
        this.root = elementRef(element)
      }
    }

    // Attach the children. Sort the edges to match the children order to the db edge order
    edges.sort(sortEdges).forEach((edge, index) => {
      const source = this.element(edge.source)
      const target = this.element(edge.target)

      if (!source || !target) {
        throw new Error('Can not find source or target element of edge')
      }

      source.addChild(target)
      target.setParentElement(elementRef(source.id))
      target.setOrder(edge.order || index)
    })

    return this
  }

  public static fromFragment(fragment: ElementGraphFragment) {
    return new ElementTree({}).updateFromFragment(fragment)
  }
}
