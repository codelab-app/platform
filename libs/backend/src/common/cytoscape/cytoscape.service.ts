import { Injectable } from '@nestjs/common'
import cytoscape, { EdgeDataDefinition, NodeDataDefinition } from 'cytoscape'

@Injectable()
export class CytoscapeService {
  // constructor() {}

  /**
   * We're using elements in the cytoscape sense, not our domain sense.
   */
  static fromElements(
    nodes: Array<NodeDataDefinition>,
    edges: Array<EdgeDataDefinition>,
  ) {
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
}
