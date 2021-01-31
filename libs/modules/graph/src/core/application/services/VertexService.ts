import { Injectable } from '@nestjs/common'
import { Vertex as PrismaVertex } from '@prisma/client'
import { PrismaService } from '@codelab/backend'

@Injectable()
export class VertexService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * The `target` on the edge is the parent
   */
  async parent(vertexId: string): Promise<PrismaVertex | null> {
    const edge = await this.prismaService.edge.findFirst({
      where: {
        target: vertexId,
      },
    })

    if (!edge) {
      return null
    }

    return await this.prismaService.vertex.findFirst({
      where: {
        id: edge.source,
      },
    })
  }

  /**
   * The `source` on the edge is the child
   */
  async children(vertexId: string) {
    return await this.prismaService.graph.findFirst({
      select: {
        vertices: true,
      },
      where: {
        edges: {
          every: {
            target: vertexId,
          },
        },
      },
    })
  }
}
