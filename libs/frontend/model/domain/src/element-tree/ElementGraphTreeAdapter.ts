import { ElementTree } from '@codelab/frontend/abstract/props'
import {
  ComponentFragment,
  ElementEdgeFragment,
  ElementFragment,
} from '@codelab/shared/codegen/graphql'
import { getElementData, TreeAdapter } from '@codelab/shared/core'
import { SingularElementArgument } from 'cytoscape'

//
// Hook:
//

// const getNodeData = (node: SingularElementArgument) =>
//   (node?.data()?.data as ElementFragment | ComponentFragment) ?? null

type Vertex = ComponentFragment | ElementFragment
type Edge = ElementEdgeFragment

const isDataElement = (node: SingularElementArgument) =>
  getElementData(node)?.__typename === 'Element'

export const isElement = ({ __typename }: any) => __typename === 'Element'

export const isComponent = ({ __typename }: any) => __typename === 'Component'

const isDataComponent = (node: SingularElementArgument) =>
  getElementData(node)?.__typename === 'Component'

export class ElementGraphTreeAdapter
  extends TreeAdapter<Vertex, Edge>
  implements ElementTree<Vertex>
{
  predicate = isDataElement

  /**
   * Component methods
   */

  getComponentRootElement(componentId: string) {
    return this.findElementFrom<ElementFragment>(componentId, isDataElement)
  }

  getComponentById(componentId: string) {
    return this.getElement<ComponentFragment>(componentId, getElementData)
  }

  getComponentOfElement(elementId: string) {
    return this.cy
      .getElementById(elementId)
      .outgoers()
      .filter(isDataComponent)
      .first()
      .map<ComponentFragment>(getElementData)[0]
  }
}
