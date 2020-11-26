import { NodeSingular } from 'cytoscape'
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

const bfs = (vertex: NodeSingular): NodeI => {
  const outgoingVertices = vertex.outgoers().nodes()

  return {
    ...vertex.data(),
    children: outgoingVertices.reduce(
      (nodes: Array<NodeI>, outgoingVertex: NodeSingular) => {
        nodes.push(bfs(outgoingVertex))

        return nodes
      },
      [],
    ),
  }
}

export const convertGraphToTree = (data: IGraphData): NodeI => {
  const cy = makeCytoscape(mapper(data))

  const roots = cy.elements().roots()

  const rootsCount = roots.size()

  if (rootsCount !== 1) {
    const errorMsg =
      rootsCount === 0 ? `There in no root node` : `There is more that one root`

    throw new Error(`Graph: ${errorMsg}`)
  }

  const root = cy.elements().roots().first()

  return bfs(root)
}
