import { Graph } from '../../../domain/graph/Graph'
import { CreateGraphInput } from './CreateGraphInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class CreateGraphService
  implements TransactionalUseCase<CreateGraphInput, Graph> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(request: CreateGraphInput): Promise<Graph> {
    return await this.prismaService.graph.create({
      data: {
        ...request,
      },
    })
  }
}
