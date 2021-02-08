import { Inject, Injectable } from '@nestjs/common'
import { GraphService } from '../../services/GraphService'
import { GetTreeInput } from './GetTreeInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

export interface GetTreeGraphArgs {
  select: {
    id: true
    type: true
    label: true
    vertices: true
    edges: true
  }
  where: {
    id: string
  }
}
@Injectable()
export class GetTreeService implements TransactionalUseCase<GetTreeInput, any> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
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
