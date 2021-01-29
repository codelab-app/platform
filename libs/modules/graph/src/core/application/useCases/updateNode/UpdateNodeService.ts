import { Injectable } from '@nestjs/common'
import { Vertex } from '@prisma/client'
import { UpdateNodeInput } from './UpdateNodeInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class UpdateNodeService
  implements TransactionalUseCase<UpdateNodeInput, Vertex> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ vertexId, type }: UpdateNodeInput) {
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
