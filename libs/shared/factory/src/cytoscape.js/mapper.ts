import { EdgeDefinition, NodeDefinition } from 'cytoscape'
import objectMapper from 'object-mapper'
import { EdgeA, VertexA } from '@codelab/shared/interface/graph'

export const cyMapVertices = (
  vertices: Array<VertexA>,
): Array<NodeDefinition> => {
  const mapper = {
    id: 'data.id',
    parent: 'data.parent',
  }

  return vertices.map((vertex) => {
    return objectMapper<NodeDefinition>(vertex, mapper)
  })
}

export const cyMapEdges = (edges: Array<EdgeA>): Array<EdgeDefinition> => {
  const mapper = {
    id: 'data.id',
    start: 'data.source',
    end: 'data.target',
  }

  return edges.map((edge) => {
    return objectMapper<EdgeDefinition>(edge, mapper)
  })
}
