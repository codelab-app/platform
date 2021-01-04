import cytoscape from 'cytoscape'
import React from 'react'
import { demoEdges, demoNodes } from './graph.data'

const cy = cytoscape({
  // We are using for data structure only, not UI
  headless: true,
  elements: {
    nodes: demoNodes,
    edges: demoEdges,
  },
})

export default {
  title: 'Graph',
}

export const Default = () => {
  const queue: Array<string> = []

  console.log(cy.nodes())

  cy.elements().depthFirstSearch({
    root: 'n0',
    visit: (v, e, u, i, depth) => {
      const id = v.id()

      // console.log(v, e, u, i, depth)
      // console.log(id)
      queue.unshift(id)
    },
  })

  // console.log(queue)

  return <h1>Cytograph DFS</h1>
}
