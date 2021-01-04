import { EdgeDefinition, NodeDefinition } from 'cytoscape'
import { merge } from 'lodash'
import objectMapper from 'object-mapper'
import { EdgeA, VertexA } from '@codelab/alpha/shared/interface/graph-v2'

export const cyMapVertices = (
  vertices: Array<Partial<VertexA>>,
): Array<NodeDefinition> => {
  const mapper = {
    id: 'data.id',
    parent: 'data.parent',
  }

  return vertices.map((vertex) => {
    // Spread rest of vertex props
    return merge(objectMapper<NodeDefinition>(vertex, mapper), {
      data: { ...vertex },
    })
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
