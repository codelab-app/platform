import cytoscape, { Core, ElementsDefinition } from 'cytoscape'
import React, { CSSProperties, useEffect, useRef } from 'react'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dagre = require('cytoscape-dagre')

cytoscape.use(dagre)

const divStyle: CSSProperties = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
}

export const CyGraph: React.FC<ElementsDefinition> = (props) => {
  const { nodes, edges } = props
  const cyContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cy: Core = cytoscape({
      container: cyContainer.current,
      layout: {
        name: 'dagre',
      },
      elements: {
        nodes,
        edges,
      },
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(id)',
            shape: 'hexagon',
            'background-color': 'red',
          },
        },
      ],
    })

    cy.edges('edge').style({
      'curve-style': 'bezier',
      'target-arrow-shape': 'triangle',
    })
  }, [cyContainer, nodes, edges])

  return <div style={divStyle} ref={cyContainer} />
}
