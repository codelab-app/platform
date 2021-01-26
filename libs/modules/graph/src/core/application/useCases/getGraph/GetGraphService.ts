import { Graph } from '../../../domain/graph/Graph'
import { GetGraphInput } from './GetGraphInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class GetGraphService
  implements TransactionalUseCase<GetGraphInput, Graph | null> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ id }: GetGraphInput): Promise<Graph | null> {
    return await this.prismaService.graph.findUnique({
      where: {
        id,
      },
    })
  }
}
