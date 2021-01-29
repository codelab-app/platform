import { Injectable } from '@nestjs/common'
import { PrismaService } from '@codelab/backend'

@Injectable()
export class VertexService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * The `target` on the edge is the parent
   */
  async parent(vertexId: string) {
    return await this.prismaService.graph.findFirst({
      select: {
        vertices: true,
      },
      where: {
        edges: {
          every: {
            source: vertexId,
          },
        },
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
