import { ElementTree } from '@codelab/frontend/abstract/props'
import {
  ComponentFragment,
  ElementEdgeFragment,
  ElementFragment,
} from '@codelab/shared/codegen/graphql'
import { getElementData } from '@codelab/shared/core'
import { filterPredicate, Predicate, TreeAdapter } from '../tree/TreeAdapter'

type IVertex = ComponentFragment | ElementFragment
type IEdge = ElementEdgeFragment

export const isElement: Predicate = ({ __typename }: any) =>
  __typename === 'Element'

export const isComponent: Predicate = ({ __typename }: any) =>
  __typename === 'Component'

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
      title: element.name ?? element?.atom?.type ?? 'Default',
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
