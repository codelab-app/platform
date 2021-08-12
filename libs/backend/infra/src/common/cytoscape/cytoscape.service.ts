import { Edge, Graph, Vertex } from '@codelab/backend/abstract/types'
import { Injectable } from '@nestjs/common'
import cytoscape, {
  Core,
  EdgeDataDefinition,
  NodeDataDefinition,
} from 'cytoscape'

@Injectable()
export class CytoscapeService {
  // constructor() {}

  /**
   * We're using elements in the cytoscape sense, not our domain sense.
   */
  fromElements({ nodes, edges }: CytoscapeGraph) {
    return cytoscape({
      headless: true,
      elements: {
        nodes: nodes.map((node) => ({
          data: {
            ...node,
          },
        })),
        edges: edges.map((edge) => ({
          data: {
            ...edge,
          },
        })),
      },
    })
  }

  async treeToGraph<TVertex extends Vertex, TEdge extends Edge>(
    cy: Core,
    vertexMapper: (nodeData: any) => TVertex | Promise<TVertex>,
    edgeMapper: (edgeData: any) => TEdge | Promise<TEdge>,
  ): Promise<Graph<TVertex, TEdge>> {
    return {
      vertices: await Promise.all(
        cy.nodes().map((node) => vertexMapper(node.data())),
      ),
      edges: await Promise.all(
        cy.edges().map((edge) => edgeMapper(edge.data())),
      ),
    }
  }
}

export interface CytoscapeGraph {
  nodes: Array<NodeDataDefinition>
  edges: Array<EdgeDataDefinition>
}
