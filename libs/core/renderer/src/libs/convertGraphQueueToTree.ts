import { IGraphData } from './renderer-graph-components'
import { CytoscapeI, makeCytoscape } from '@codelab/shared/factory'
import { NodeI } from '@codelab/shared/interface/node'

const mapper = (data: IGraphData): CytoscapeI => {
  return data.graph.reduce(
    (acc, curr) => {
      acc.vertices = curr.vertices
      acc.edges = curr.edges.map(
        ({ source: start, target: end, ...other }) => ({
          start,
          end,
          ...other,
        }),
      )

      return acc
    },
    {
      edges: [],
      vertices: [],
    } as CytoscapeI,
  )
}

/* eslint-disable no-param-reassign */
export const convertGraphToTree = (data: IGraphData): NodeI => {
  const cy = makeCytoscape(mapper(data))

  const roots = cy.elements().roots()

  if (roots.size() !== 1) {
    throw new Error(`Graph:There is more that one root`)
  }

  const root = cy.elements().roots().first()
  let tree: NodeI | null = null

  // cy.elements().breadthFirstSearch({
  cy.elements().breadthFirstSearch({
    root,
    visit: (v: any, e) => {
      const node = {
        ...v.data(),
      }

      v._node = node

      if (tree === null) {
        tree = node
      }

      if (e) {
        const parent: any = e.source()

        parent._node.children = Array.isArray(parent._node.children)
          ? [...parent._node.children, node]
          : [node]
      }
    },
  })

  return (tree as unknown) as NodeI
}
