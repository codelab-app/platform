import { NodeSingular } from 'cytoscape'
import { GraphDto } from '../../../../../modules/graph/src/core/domain/graph/GraphDto'
import { IGraphData } from './renderer-graph-components'
import { makeCytoscape } from '@codelab/alpha/shared/factory'
import { NodeI } from '@codelab/alpha/shared/interface/node'

const mapper = ({ vertices = [], edges = [] }: GraphDto): any => {
  const cytoEdges = edges?.map(
    ({ source: start, target: end, ...other }: any) => ({
      start,
      end,
      ...other,
    }),
  )

  const cytoVertices = vertices?.map((v) => {
    return {
      ...v,
      // parent,
    }
  })

  return {
    vertices: cytoVertices,
    edges: cytoEdges,
  }
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
      rootsCount === 0 ? `There is no root node` : `There is more that one root`

    throw new Error(`Graph: ${errorMsg}`)
  }

  const root = cy.elements().roots().first()

  return bfs(root)
}
