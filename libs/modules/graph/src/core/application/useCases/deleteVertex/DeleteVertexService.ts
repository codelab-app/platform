import { Injectable } from '@nestjs/common'
import { Vertex } from '@prisma/client'
import { DeleteVertexInput } from './DeleteVertexInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

/**
 * Delete all attached edges as well
 */

@Injectable()
export class DeleteVertexService
  implements TransactionalUseCase<DeleteVertexInput, Vertex> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ vertexId }: DeleteVertexInput) {
    try {
      const graph = await this.prismaService.graph.findFirst({
        where: {
          vertices: {
            every: {
              id: vertexId,
            },
          },
        },
      })

      if (!graph) {
        throw new Error()
      }

      console.log(graph)

      await this.prismaService.graph.update({
        where: {
          id: graph.id,
        },
        data: {
          edges: {
            deleteMany: {
              OR: [
                {
                  target: {
                    in: [vertexId],
                  },
                },
                {
                  source: {
                    in: [vertexId],
                  },
                },
              ],
            },
          },
        },
      })

      return await this.prismaService.vertex.delete({
        where: {
          id: vertexId,
        },
      })
    } catch (e) {
      throw new Error()
    }
  }
}
