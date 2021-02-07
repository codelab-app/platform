import { Injectable } from '@nestjs/common'
import { Vertex } from '@prisma/client'
import { MoveVertexInput } from './MoveVertexInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class MoveVertexService
  implements TransactionalUseCase<MoveVertexInput, Vertex | null> {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   *
   * This UseCase should really be called AssignNewParentVertex, as we restrict oveVertex to assigning new parent only.
   *
   * MoveVertex simply updates the edge. We keep the target vertex on the edge, while updating the source vertex
   *
   * @param currentVertexId The Vertex we want to move
   * @param targetVertexId The parent Vertex we want to move to
   */
  async execute({ currentVertexId, parentVertexId }: MoveVertexInput) {
    const graph = await this.prismaService.graph.findFirst({
      select: {
        edges: {
          where: {
            target: currentVertexId,
          },
        },
      },
    })

    if (!graph || graph.edges.length !== 1) {
      throw new Error('Edge to update not found')
    }

    await this.prismaService.edge.update({
      where: {
        id: graph.edges[0].id,
      },
      data: {
        source: parentVertexId,
      },
    })

    return await this.prismaService.vertex.findUnique({
      where: { id: currentVertexId },
    })
  }
}
