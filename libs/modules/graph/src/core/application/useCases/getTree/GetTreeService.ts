import { Inject, Injectable } from '@nestjs/common'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
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
        rejectOnNotFound: true,
      })

      return await this.graphService.treeFrom(graph)
    } catch (e) {
      throw new CodelabPrismaError('Graph not found', e)
    }
  }
}
