import { Edge, Graph, Vertex } from '@codelab/backend/abstract/types'
import { Node } from '@codelab/frontend/abstract/props'
import cytoscape from 'cytoscape'

export abstract class TreeService implements Node<any> {
  protected readonly cy: cytoscape.Core

  constructor(graph?: Graph<Vertex, Edge>) {
    const { edges, vertices } = graph || { edges: [], vertices: [] }
    const parentsMap = new Map<string, string>()

    edges.forEach((edge) => {
      parentsMap.set(edge.target, edge.source)
    })

    this.cy = cytoscape({
      headless: true,
      elements: {
        nodes: vertices.map((v) => ({
          data: { id: v.id, data: v, parent: parentsMap.get(v.id) },
        })),
        edges: edges.map((v) => ({
          data: {
            source: v.source,
            target: v.target,
            data: v,
            id: TreeService.edgeId(v.source, v.target),
          },
        })),
      },
    })
  }

  private static edgeId = (sourceId: string, targetId: string) =>
    `${sourceId}--${targetId}`
}
