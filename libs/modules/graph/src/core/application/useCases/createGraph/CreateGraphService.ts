import { Inject, Injectable } from '@nestjs/common'
import { Graph } from '../../../domain/graph/Graph'
import { CreateGraphInput } from './CreateGraphInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class CreateGraphService
  implements TransactionalUseCase<CreateGraphInput, Graph> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute(request: CreateGraphInput): Promise<Graph> {
    return await this.prismaService.graph.create({
      data: {
        ...request,
      },
    })
  }
}
