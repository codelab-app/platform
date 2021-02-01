import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import P from 'bluebird'
import cytoscape, {
  EdgeDefinition,
  NodeDataDefinition,
  NodeDefinition,
  NodeSingular,
} from 'cytoscape'
import { NodeI } from '../../domain/node/Node'
import { GetTreeGraphArgs } from '../useCases/getTree/GetTreeService'
import { VertexService } from './VertexService'
import { PrismaService } from '@codelab/backend'

@Injectable()
export class GraphService {
  constructor(private readonly vertexService: VertexService) {}

  /**
   * @param graph
   */
  async treeFrom(
    graph: Prisma.GraphGetPayload<GetTreeGraphArgs>,
  ): Promise<NodeI> {
    const cy = await this.cytoscape(graph)

    const root = cy.elements().roots().first()

    return this.bfs(root)
  }

  /**
   * Replacing with CytoscapeService, since we need access on frontend
   */
  private async cytoscape({
    vertices,
    edges,
  }: Prisma.GraphGetPayload<GetTreeGraphArgs>) {
    const verticesPromises = await P.map<any, NodeDefinition>(
      vertices,
      async ({ id, type, props }) => {
        const parent = await this.vertexService
          .parent(id)
          .then((v) => v?.id ?? undefined)

        return {
          data: {
            id,
            parent,
            type,
            props,
          },
        }
      },
    )

    return await cytoscape({
      headless: true,
      elements: {
        nodes: verticesPromises,
        edges: edges.map<EdgeDefinition>(({ id, source, target }) => ({
          data: {
            id,
            source,
            target,
          },
        })),
      },
    })
  }

  private bfs(vertex: NodeSingular): NodeI {
    const outgoingVertices = vertex.outgoers().nodes()

    return {
      ...vertex.data(),
      children: outgoingVertices.reduce(
        (nodes: Array<NodeDataDefinition>, outgoingVertex: NodeSingular) => [
          ...nodes,
          this.bfs(outgoingVertex),
        ],
        [],
      ),
    }
  }
}
