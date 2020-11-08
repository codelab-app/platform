import cytoscape from 'cytoscape'
import { cyMapEdges, cyMapVertices } from './mapper'
import { EdgeA, VertexA } from '@codelab/shared/interface/graph'

export interface CytoscapeI {
  vertices: Array<VertexA>
  edges: Array<EdgeA>
}

export const makeCytoscape = ({ vertices, edges }: CytoscapeI) => {
  return cytoscape({
    headless: true,
    elements: {
      nodes: cyMapVertices(vertices),
      edges: cyMapEdges(edges),
    },
  })
}
