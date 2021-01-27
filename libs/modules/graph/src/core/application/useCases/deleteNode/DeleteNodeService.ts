import { Inject, Injectable } from '@nestjs/common'
import { Graph } from '../../../domain/graph/Graph'
import { DeleteNodeInput } from './DeleteNodeInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

/**
 * Delete all attached edges as well
 */

@Injectable()
export class DeleteNodeService
  implements TransactionalUseCase<DeleteNodeInput, Graph> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ vertexId }: DeleteNodeInput): Promise<Graph> {
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

      return await this.prismaService.graph.update({
        where: {
          id: graph.id,
        },
        data: {
          vertices: {
            delete: {
              id: vertexId,
            },
          },
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
    } catch (e) {
      throw new Error()
    }
  }
}
