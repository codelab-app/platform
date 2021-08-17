import { ElementTree } from '@codelab/frontend/abstract/props'
import {
  ComponentFragment,
  ElementEdgeFragment,
  ElementFragment,
} from '@codelab/shared/codegen/graphql'
import { getElementData } from '@codelab/shared/core'
import { filterPredicate, Predicate, TreeAdapter } from '../tree/TreeAdapter'

type Vertex = ComponentFragment | ElementFragment
type Edge = ElementEdgeFragment

export const isElement: Predicate = ({ __typename }: any) =>
  __typename === 'Element'

export const isComponent: Predicate = ({ __typename }: any) =>
  __typename === 'Component'

export class ElementGraphTreeAdapter
  extends TreeAdapter<Vertex, Edge>
  implements ElementTree<Vertex>
{
  predicate = isElement

  /**
   * Component methods
   */

  getComponentRootElement(componentId: string) {
    return this.findElementFrom<ElementFragment>(componentId, isElement)
  }

  getComponentById(componentId: string) {
    return this.getElement<ComponentFragment>(componentId, getElementData)
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
