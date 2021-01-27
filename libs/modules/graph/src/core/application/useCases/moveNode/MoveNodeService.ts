import { Inject, Injectable } from '@nestjs/common'
import { Graph } from '../../../domain/graph/Graph'
import { MoveNodeInput } from './MoveNodeInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class MoveNodeService
  implements TransactionalUseCase<MoveNodeInput, Graph> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismService: PrismaService,
  ) {}

  async execute({ graphId }: MoveNodeInput): Promise<Graph> {
    return await Promise.resolve(null as any)
  }
}
