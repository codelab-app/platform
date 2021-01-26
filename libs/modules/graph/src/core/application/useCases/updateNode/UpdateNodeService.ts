import { Vertex } from '../../../domain/vertex/Vertex'
import { UpdateNodeInput } from './UpdateNodeInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class UpdateNodeService
  implements TransactionalUseCase<UpdateNodeInput, Vertex> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ vertexId, graphId, type }: UpdateNodeInput): Promise<Vertex> {
    try {
      // TODO: Remove as Vertex cast
      return (await this.prismaService.vertex.update({
        select: {
          type: true,
        },
        where: {
          id: vertexId,
        },
        data: {
          type,
        },
      })) as Vertex
    } catch (e) {
      throw new Error()
    }
  }
}
