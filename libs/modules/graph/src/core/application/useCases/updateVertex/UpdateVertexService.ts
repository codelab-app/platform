import { Injectable } from '@nestjs/common'
import { Vertex } from '@prisma/client'
import { UpdateVertexInput } from './UpdateVertexInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class UpdateVertexService
  implements TransactionalUseCase<UpdateVertexInput, Vertex> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ vertexId, type }: UpdateVertexInput) {
    try {
      return await this.prismaService.vertex.update({
        where: {
          id: vertexId,
        },
        data: {
          type,
        },
      })
    } catch (e) {
      throw new Error()
    }
  }
}
