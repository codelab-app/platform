import { PrismaService } from '@codelab/backend'

export class GraphService {
  constructor(private readonly prismaService: PrismaService) {}

  async getVertices(graphId: string) {
    const a = await this.prismaService.vertex.findMany({
      where: {
        graphId,
      },
    })

    return a
  }

  async getEdges(graphId: string) {
    return this.prismaService.edge.findMany({
      where: {
        graphId,
      },
    })
  }
}
