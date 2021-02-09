import { Inject, Injectable } from '@nestjs/common'
import { Vertex } from '@prisma/client'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
import { UpdateVertexInput } from './UpdateVertexInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class UpdateVertexService
  implements TransactionalUseCase<UpdateVertexInput, Vertex> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ vertexId, type, props }: UpdateVertexInput) {
    try {
      return await this.prismaService.vertex.update({
        where: {
          id: vertexId,
        },
        data: {
          type,
          props,
        },
      })
    } catch (e) {
      throw new CodelabPrismaError(
        `Could not update vertex with id: ${vertexId}`,
        e,
      )
    }
  }
}
