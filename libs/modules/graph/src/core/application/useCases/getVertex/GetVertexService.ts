import { Injectable } from '@nestjs/common'
import { Vertex } from '@prisma/client'
import { GetVertexInput } from './GetVertexInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class GetVertexService
  implements TransactionalUseCase<GetVertexInput, Vertex | null> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ id }: GetVertexInput) {
    try {
      return await this.prismaService.vertex.findUnique({
        where: {
          id,
        },
      })
    } catch (e) {
      throw new Error()
    }
  }
}
