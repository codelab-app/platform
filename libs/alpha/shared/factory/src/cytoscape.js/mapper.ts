import { EdgeDefinition, NodeDefinition } from 'cytoscape'
import { merge } from 'lodash'
import objectMapper from 'object-mapper'
import {
  EdgeFragmentsFragment,
  VertexFragmentsFragment,
} from '@codelab/generated'

/**
 * Map from GraphQL to Cytoscape
 *
 * @param vertices GraphQL queried data
 */
export const cyMapVertices = (
  vertices: Array<VertexFragmentsFragment>,
): Array<NodeDefinition> => {
  const mapper: Partial<Record<keyof VertexFragmentsFragment, string>> = {
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

export const cyMapEdges = (
  edges: Array<EdgeFragmentsFragment>,
): Array<EdgeDefinition> => {
  const mapper: Partial<Record<keyof EdgeFragmentsFragment, string>> = {
    id: 'data.id',
    source: 'data.source',
    target: 'data.target',
  }

  return edges.map((edge) => {
    return objectMapper<EdgeDefinition>(edge, mapper)
  })
}
