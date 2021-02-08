import { Inject, Injectable } from '@nestjs/common'
import { Vertex } from '@prisma/client'
import { DeleteVertexInput } from './DeleteVertexInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

/**
 * Delete all attached edges as well
 */

@Injectable()
export class DeleteVertexService
  implements TransactionalUseCase<DeleteVertexInput, Vertex | null> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ vertexId }: DeleteVertexInput) {
    try {
      const edges = await this.prismaService.edge.findMany({
        select: {
          id: true,
          source: true,
          target: true,
        },
        where: {
          OR: [
            {
              target: vertexId,
            },
            {
              source: vertexId,
            },
          ],
        },
      })

      // Delete related edges
      const deleted = await this.prismaService.edge.deleteMany({
        where: {
          id: {
            in: edges.map((edge) => edge.id),
          },
        },
      })

      // Delete vertex
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
