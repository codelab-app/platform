import { Injectable } from '@nestjs/common'
import { GraphService } from '../../services/GraphService'
import { GetTreeInput } from './GetTreeInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class GetTreeService implements TransactionalUseCase<GetTreeInput, any> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly graphService: GraphService,
  ) {}

  async execute({ graphId }: GetTreeInput) {
    try {
      const graph = await this.prismaService.graph.findUnique({
        select: {
          id: true,
          type: true,
          label: true,
          vertices: true,
          edges: true,
        },
        where: {
          id: graphId,
        },
      })

      if (!graph) {
        throw new Error('Graph not found')
      }

      return await this.graphService.treeFrom(graph)
    } catch (e) {
      throw new Error('Graph not found')
    }
  }
}
