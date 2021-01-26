import { Graph } from '../../../domain/graph/Graph'
import { MoveNodeInput } from './MoveNodeInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class MoveNodeService
  implements TransactionalUseCase<MoveNodeInput, Graph> {
  constructor(private readonly prismService: PrismaService) {}

  async execute({ graphId }: MoveNodeInput): Promise<Graph> {
    return await Promise.resolve(null as any)
  }
}
