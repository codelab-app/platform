import cytoscape, { Core, EventObject } from 'cytoscape'
import cdnd from 'cytoscape-compound-drag-and-drop'
import React, { CSSProperties, useEffect, useRef } from 'react'
import { CyGraphService } from './CyGraph.service'
import { ICyGraphProps } from './ICyGraphProps'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dagre = require('cytoscape-dagre')

cytoscape.use(dagre)
cytoscape.use(cdnd)

type ExtendedEventHandler = (
  event: EventObject,
  dropTarget?: any,
  dropSibling?: any,
) => void

export interface ExtendedCore extends Core {
  compoundDragAndDrop?: (options?: any) => any
}

const divStyle: CSSProperties = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
}
const service = new CyGraphService()

export const CyGraph: React.FC<ICyGraphProps> = (props) => {
  const { nodes, edges } = props.elements
  const { endpoint } = props
  const cyContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cy: ExtendedCore = cytoscape({
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
            shape: 'ellipse',
            // 'background-color': 'red',
          },
        },
      ],
    })

    cy.edges('edge').style({
      'curve-style': 'bezier',
      'target-arrow-shape': 'triangle',
    })
    const options = {
      grabbedNode: (node: any) => true, // filter function to specify which nodes are valid to grab and drop into other nodes
      dropTarget: (node: any) => true, // filter function to specify which parent nodes are valid drop targets
      dropSibling: (node: any) => true, // filter function to specify which orphan nodes are valid drop siblings
      newParentNode: (grabbedNode: any, dropSibling: any) => ({}), // specifies element json for parent nodes added by dropping an orphan node on another orphan (a drop sibling)
      overThreshold: 1, // make dragging over a drop target easier by expanding the hit area by this amount on all sides
      outThreshold: 1, // make dragging out of a drop target a bit harder by expanding the hit area by this amount on all sides
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const cdnd1 = cy.compoundDragAndDrop(options)
    const onNodeDrop: ExtendedEventHandler = (
      event,
      dropTarget,
      dropSibling,
    ) => {
      const node = event.target
      const source = node.data('id')
      const target = dropSibling.data('id')

      console.log('source', source)
      console.log('target', target)
      service
        .callServerWithEndpoint(endpoint as string, { source, target })
        .then((res) => {
          cy.remove(cy.elements())
          cy.add(res.data.nodes)
          cy.add(res.data.edges)
          cy.layout({
            name: 'dagre',
          }).run()
        })
    }

    const onDragOver: ExtendedEventHandler = (
      event,
      dropTarget,
      dropSibling,
    ) => {
      dropTarget[0].style('label', '.')
    }

    cy.on('cdndover', onDragOver)
    cy.on('cdnddrop', onNodeDrop)
  }, [cyContainer, nodes, edges, endpoint])

  return <div style={divStyle} ref={cyContainer} />
}
