import React, { FunctionComponent } from 'react'
import { makeCytoscape } from '../../../../shared/factory/src/cytoscape.js/factory'
import { elementParameterFactory } from '@codelab/core/renderer'
import { NodeType } from '@codelab/shared/interface/node'
import { Props } from '@codelab/shared/interface/props'

export interface IGraphVertex<
  T extends NodeType = NodeType,
  P extends Props = Props
> {
  id: string
  type: T
  props?: P
  parent: string | null
}

export interface IGraphEdge {
  id: string
  start: string
  end: string
}

export interface IComponentGraph<
  T extends NodeType = NodeType,
  P extends Props = Props
> {
  vertices: Array<IGraphVertex<T, P>>
  edges: Array<IGraphEdge>
}

export const buildComponentsGraph = <P extends {} = {}>(
  data: IComponentGraph,
): FunctionComponent<P> => {
  const cy = makeCytoscape(data)

  // Avoid errors if there is no root node
  if (cy.elements().roots().empty()) return () => null

  const root = cy.elements().roots().first()

  cy.elements().breadthFirstSearch({
    roots: `#${root.id()}`,
    visit: (node) => {
      const [Component, props] = elementParameterFactory(node.data())
      const element = React.createElement(Component, props)

      // Add react element to node
      node.attr('Component', element)

      if (node.parent().nonempty()) {
        // Get node parent
        const parent = node.parent().first()
        const { Component: ParentComponent } = parent.data()

        // Attach current node as child to the parent props (children)
        ParentComponent.props.children = ParentComponent.props.children || []
        ParentComponent.props.children.push(element)
        parent.attr('Component', React.cloneElement(ParentComponent))
      }
    },
  })

  return (props: any) => React.cloneElement(root.data().Component, props)
}
