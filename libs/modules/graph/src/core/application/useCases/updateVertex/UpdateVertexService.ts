import { Injectable } from '@nestjs/common'
import { Vertex } from '@prisma/client'
import { UpdateVertexInput } from './UpdateVertexInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class UpdateVertexService
  implements TransactionalUseCase<UpdateVertexInput, Vertex> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ vertexId, type, props }: UpdateVertexInput) {
    console.log(vertexId, type, props)
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
      console.log(e)
      throw new Error(e)
    }
  }
}
