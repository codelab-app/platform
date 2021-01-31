import { Injectable } from '@nestjs/common'
import P from 'bluebird'
import cytoscape, { EdgeDefinition, NodeDefinition } from 'cytoscape'
import { Graph } from '../../domain/graph/Graph'
import { VertexService } from './VertexService'
import { PrismaService } from '@codelab/backend'

@Injectable()
export class GraphService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly vertexService: VertexService,
  ) {}

  createLayoutGraph() {
    console.log('createLayoutGraph')
    //
  }

  async treeFrom(graph: Graph): Promise<Node> {
    const cy = await this.cytoscape(graph)

    console.log(cy.elements())

    return {} as any
  }

  private async cytoscape({ vertices, edges }: Graph) {
    const verticesPromises = await P.map<any, NodeDefinition>(
      vertices,
      async ({ id }) => {
        const parent = await this.vertexService
          .parent(id)
          .then((v) => v?.id ?? undefined)

        return {
          data: {
            id,
            parent,
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
}
