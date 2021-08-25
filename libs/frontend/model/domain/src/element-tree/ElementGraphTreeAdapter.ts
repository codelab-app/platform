import { ElementTree } from '@codelab/frontend/abstract/props'
import {
  ComponentFragment,
  ElementEdgeFragment,
  ElementFragment,
} from '@codelab/shared/codegen/graphql'
import {
  filterPredicate,
  getElementData,
  Predicate,
  TreeAdapter,
} from '@codelab/shared/core'

type IVertex = ComponentFragment | ElementFragment
type IEdge = ElementEdgeFragment

export const isElement: Predicate = (element: any) => {
  return element?.__typename === 'Element'
}

// TODO: element is undefined at times, regression behavior
export const isComponent: Predicate = (element: any) => {
  // console.log('isComponent', element)

  return element?.__typename === 'Component'
}

export class ElementGraphTreeAdapter
  extends TreeAdapter<IVertex, IEdge>
  implements ElementTree<IVertex>
{
  predicate = isElement

  /**
   * Component methods
   */

  protected antdNodeMapper(element: ElementFragment) {
    return {
      ...element,
      key: element.id,
      name: element.name || element?.atom?.type,
    }
  }

  getComponentRootElement(componentId: string) {
    return this.findElementFrom<ElementFragment>(componentId, isElement)
  }

  getComponentById(componentId: string) {
    return this.cy
      .getElementById(componentId)
      .filter(filterPredicate(isComponent))
      .first()
      .map<ComponentFragment>(getElementData)[0]
  }

  getComponentOfElement(elementId: string) {
    return this.cy
      .getElementById(elementId)
      .outgoers()
      .filter(filterPredicate(isComponent))
      .first()
      .map<ComponentFragment>(getElementData)[0]
  }
}
