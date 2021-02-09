import { Inject, Injectable } from '@nestjs/common'
import { Vertex } from '@prisma/client'
import { CodelabError } from '../../../../../../../../apps/api/codelab/src/app/CodelabError'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
import { MoveVertexInput } from './MoveVertexInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

export type VertexId = string

@Injectable()
export class MoveVertexService
  implements TransactionalUseCase<MoveVertexInput, Vertex | null> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

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
    // No longer works after adding create page under create app
    // const graph = await this.prismaService.graph.findFirst({
    //   select: {
    //     edges: {
    //       where: {
    //         target: currentVertexId,
    //       },
    //     },
    //   },
    // })

    const edge = await this.prismaService.edge.findFirst({
      where: {
        target: currentVertexId,
      },
    })

    // if (!graph || graph.edges.length !== 1) {
    if (!edge) {
      throw new CodelabError('Edge to update not found')
    }

    try {
      await this.prismaService.edge.update({
        where: {
          id: edge.id,
        },
        data: {
          source: parentVertexId,
        },
      })

      return await this.prismaService.vertex.findUnique({
        where: { id: currentVertexId },
        rejectOnNotFound: true,
      })
    } catch (e) {
      throw new CodelabPrismaError('Unable to move element', e)
    }
  }
}
