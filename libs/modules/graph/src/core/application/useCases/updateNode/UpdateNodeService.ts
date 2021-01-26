import { Vertex } from '../../../domain/vertex/Vertex'
import { UpdateNodeInput } from './UpdateNodeInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class UpdateNodeService
  implements TransactionalUseCase<UpdateNodeInput, Vertex> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ vertexId, graphId, type }: UpdateNodeInput): Promise<Vertex> {
    return await this.prismaService.vertex.update({
      where: {
        id: vertexId,
      },
      data: {
        type,
      },
    })
  }
}
